/**
 * Netlify Function que publica a API REST do backend (/api/*).
 *
 * O site no Netlify é estático; as chamadas a /api/* chegam a esta função
 * (veja `config.path` no fim do arquivo), que executa a mesma aplicação Express do servidor local.
 * O banco vem de BANCO_DADOS e a credencial do Firebase das variáveis FIREBASE_*,
 * configuradas no painel do Netlify.
 */
import serverless from 'serverless-http';
import { criarApp } from '../../src/backend/app.js';
import { criarJogadorRepository } from '../../src/config/banco-dados.js';

/**
 * O serverless-http entrega o corpo como Buffer, e o express.json() não o lê de novo.
 * Aqui o corpo JSON é convertido em objeto, como no servidor local.
 * @param {import('node:http').IncomingMessage & { body?: unknown }} requisicao
 */
function converterCorpoJson(requisicao) {
  const tipo = requisicao.headers['content-type'] ?? '';
  if (!Buffer.isBuffer(requisicao.body) || !tipo.includes('application/json')) {
    return;
  }
  try {
    const texto = requisicao.body.toString('utf8');
    requisicao.body = texto ? JSON.parse(texto) : undefined;
  } catch {
    requisicao.body = undefined;
  }
}

const app = criarApp({ jogadorRepository: await criarJogadorRepository() });
const executarApp = serverless(app, { request: converterCorpoJson });

/**
 * Converte a requisição recebida pelo Netlify (Request da Web) no evento que o
 * serverless-http espera, executa o Express e devolve a resposta como Response.
 * @param {Request} requisicao Requisição HTTP recebida pelo Netlify.
 * @param {object} contexto Contexto da execução.
 * @returns {Promise<Response>} Resposta HTTP.
 */
export default async function api(requisicao, contexto) {
  const url = new URL(requisicao.url);
  const corpo = ['GET', 'HEAD'].includes(requisicao.method) ? '' : await requisicao.text();
  const parametros = {};
  for (const [chave, valor] of url.searchParams) {
    (parametros[chave] ??= []).push(valor);
  }

  const resposta = await executarApp({
    httpMethod: requisicao.method,
    path: url.pathname,
    headers: Object.fromEntries(requisicao.headers),
    multiValueQueryStringParameters: parametros,
    body: corpo,
    isBase64Encoded: false
  }, contexto);

  const cabecalhos = new Headers();
  for (const [nome, valor] of Object.entries(resposta.headers ?? {})) {
    cabecalhos.set(nome, String(valor));
  }
  for (const [nome, valores] of Object.entries(resposta.multiValueHeaders ?? {})) {
    for (const valor of valores) cabecalhos.append(nome, String(valor));
  }
  const corpoResposta = resposta.isBase64Encoded ? Buffer.from(resposta.body, 'base64') : resposta.body;
  const semCorpo = [204, 304].includes(resposta.statusCode) || requisicao.method === 'HEAD';
  return new Response(semCorpo ? null : corpoResposta, { status: resposta.statusCode, headers: cabecalhos });
}

/** Faz o Netlify encaminhar todas as chamadas a /api/* para esta função. */
export const config = { path: '/api/*' };
