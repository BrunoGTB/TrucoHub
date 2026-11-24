/**
 * Testes de ponta a ponta da API de jogadores: sobe a aplicação Express
 * em uma porta livre, com o repository em memória, e faz requisições HTTP reais.
 * Executar com: npm test
 */
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { criarApp } from '../../src/backend/app.js';
import { JogadorRepositoryMemoria } from '../../src/backend/repositories/jogador-repository-memoria.js';

/** Porta 0 faz o sistema escolher uma porta livre. */
const PORTA_LIVRE = 0;

describe('API /api/jogadores', () => {
  let servidor;
  let urlBase;

  before(async () => {
    const app = criarApp({ jogadorRepository: new JogadorRepositoryMemoria() });
    servidor = app.listen(PORTA_LIVRE);
    await new Promise((resolve) => servidor.once('listening', resolve));
    urlBase = `http://localhost:${servidor.address().port}/api/jogadores`;
  });

  after(() => servidor.close());

  /** Envia uma requisição JSON e devolve { status, corpo }. */
  async function requisitar(caminho, metodo = 'GET', corpo) {
    const resposta = await fetch(`${urlBase}${caminho}`, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: corpo ? JSON.stringify(corpo) : undefined
    });
    const texto = await resposta.text();
    return { status: resposta.status, corpo: texto ? JSON.parse(texto) : null };
  }

  /** Cadastra um jogador válido pela API e devolve o id gerado. */
  async function cadastrarJogador(apelido) {
    const resposta = await requisitar('', 'POST', {
      nome: 'Carlos',
      apelido,
      email: `${apelido}@exemplo.com`,
      senha: 'senhaForte1',
      confirmacaoSenha: 'senhaForte1'
    });
    assert.equal(resposta.status, 201);
    return resposta.corpo.id;
  }

  it('cadastra o jogador e responde 201 com o apelido normalizado (RF002)', async () => {
    const resposta = await requisitar('', 'POST', {
      nome: 'Carlos',
      apelido: 'carlao',
      email: 'carlos@exemplo.com',
      senha: 'senhaForte1',
      confirmacaoSenha: 'senhaForte1'
    });
    assert.equal(resposta.status, 201);
    assert.equal(resposta.corpo.apelido, '@carlao');
    assert.equal(resposta.corpo.senhaHash, undefined);
  });

  it('responde 400 com a mensagem do requisito quando faltam campos', async () => {
    const resposta = await requisitar('', 'POST', { nome: 'Sem resto' });
    assert.equal(resposta.status, 400);
    assert.equal(resposta.corpo.mensagem, 'Preencha todos os campos.');
  });

  it('responde 400 para JSON malformado', async () => {
    const resposta = await fetch(urlBase, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{ invalido'
    });
    assert.equal(resposta.status, 400);
  });

  it('busca pelo nome e consulta pelo id (RF003)', async () => {
    const id = await cadastrarJogador('busca_rf003');

    const busca = await requisitar('?busca=busca_rf');
    assert.equal(busca.status, 200);
    assert.equal(busca.corpo.length, 1);

    const consulta = await requisitar(`/${id}`);
    assert.equal(consulta.status, 200);
    assert.equal(consulta.corpo.apelido, '@busca_rf003');

    const inexistente = await requisitar('/id-inexistente');
    assert.equal(inexistente.status, 404);
  });

  it('altera o nome do jogador (RF004)', async () => {
    const id = await cadastrarJogador('altera_rf004');
    const alteracao = await requisitar(`/${id}`, 'PATCH', { nome: 'Carlos Alberto' });
    assert.equal(alteracao.status, 200);
    assert.equal(alteracao.corpo.nome, 'Carlos Alberto');
  });

  it('exclui a conta com a senha e deixa de encontrar o jogador (RF005)', async () => {
    const id = await cadastrarJogador('exclui_rf005');

    const senhaErrada = await requisitar(`/${id}`, 'DELETE', { senha: 'outraSenha1' });
    assert.equal(senhaErrada.status, 401);

    const exclusao = await requisitar(`/${id}`, 'DELETE', { senha: 'senhaForte1' });
    assert.equal(exclusao.status, 204);

    const consultaAposExclusao = await requisitar(`/${id}`);
    assert.equal(consultaAposExclusao.status, 404);
  });
});
