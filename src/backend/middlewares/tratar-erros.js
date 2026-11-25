/**
 * Middleware final de erros do Express.
 * Erros da aplicação (AppError) viram respostas com a mensagem e o status deles;
 * qualquer outro erro é registrado no console e vira HTTP 500 com mensagem genérica,
 * para não expor detalhes internos ao usuário.
 */
import { AppError, STATUS_HTTP } from '../errors/app-error.js';

/** Mensagem para erros inesperados. */
const MENSAGEM_ERRO_INTERNO = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';

/** Mensagem para corpo de requisição com JSON malformado. */
const MENSAGEM_JSON_INVALIDO = 'O corpo da requisição não é um JSON válido.';

/**
 * @param {Error} erro
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} _next Obrigatório para o Express reconhecer o middleware de erro.
 */
export function tratarErros(erro, req, res, _next) {
  if (erro instanceof AppError) {
    res.status(erro.statusHttp).json({ mensagem: erro.message });
    return;
  }
  if (erro.type === 'entity.parse.failed') {
    res.status(STATUS_HTTP.REQUISICAO_INVALIDA).json({ mensagem: MENSAGEM_JSON_INVALIDO });
    return;
  }
  console.error('[TrucoHub] Erro inesperado:', erro);
  res.status(STATUS_HTTP.ERRO_INTERNO).json({ mensagem: MENSAGEM_ERRO_INTERNO });
}

/**
 * Responde 404 para rotas da API que não existem.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export function rotaNaoEncontrada(req, res) {
  res.status(STATUS_HTTP.NAO_ENCONTRADO).json({ mensagem: 'Rota não encontrada.' });
}
