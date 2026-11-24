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

  it('executa o CRUD completo: cadastrar, buscar, consultar, alterar e excluir', async () => {
    const cadastro = await requisitar('', 'POST', {
      nome: 'Carlos',
      apelido: 'carlao',
      email: 'carlos@exemplo.com',
      senha: 'senhaForte1',
      confirmacaoSenha: 'senhaForte1'
    });
    assert.equal(cadastro.status, 201);
    const { id } = cadastro.corpo;

    const busca = await requisitar('?busca=carl');
    assert.equal(busca.status, 200);
    assert.equal(busca.corpo.length, 1);

    const consulta = await requisitar(`/${id}`);
    assert.equal(consulta.status, 200);
    assert.equal(consulta.corpo.apelido, '@carlao');

    const alteracao = await requisitar(`/${id}`, 'PATCH', { nome: 'Carlos Alberto' });
    assert.equal(alteracao.status, 200);
    assert.equal(alteracao.corpo.nome, 'Carlos Alberto');

    const exclusao = await requisitar(`/${id}`, 'DELETE', { senha: 'senhaForte1' });
    assert.equal(exclusao.status, 204);

    const consultaAposExclusao = await requisitar(`/${id}`);
    assert.equal(consultaAposExclusao.status, 404);
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
});
