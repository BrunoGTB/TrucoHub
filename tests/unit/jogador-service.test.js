/**
 * Testes unitários do JogadorService, usando o repository em memória.
 * Executar com: npm test
 */
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { JogadorService, MENSAGENS } from '../../src/backend/services/jogador-service.js';
import { JogadorRepositoryMemoria } from '../../src/backend/repositories/jogador-repository-memoria.js';

const SENHA_VALIDA = 'segredo123';

/** Dados válidos de cadastro, com campos sobrescrevíveis. */
function dadosCadastro(sobrescrever = {}) {
  return {
    nome: 'Maria Souza',
    apelido: 'maria',
    email: 'Maria@Exemplo.com',
    senha: SENHA_VALIDA,
    confirmacaoSenha: SENHA_VALIDA,
    ...sobrescrever
  };
}

describe('JogadorService', () => {
  let repository;
  let service;

  beforeEach(() => {
    repository = new JogadorRepositoryMemoria();
    service = new JogadorService(repository);
  });

  describe('cadastrarJogador (RF002)', () => {
    it('cadastra com valores padrão, apelido com @ e e-mail em minúsculas', async () => {
      const jogador = await service.cadastrarJogador(dadosCadastro());
      assert.equal(jogador.apelido, '@maria');
      assert.equal(jogador.email, 'maria@exemplo.com');
      assert.equal(jogador.perfil, 'JOGADOR');
      assert.equal(jogador.status, 'ATIVO');
      assert.ok(jogador.id);
    });

    it('não devolve o hash da senha e grava a senha com hash', async () => {
      const jogador = await service.cadastrarJogador(dadosCadastro());
      assert.equal(jogador.senhaHash, undefined);
      const salvo = await repository.buscarPorId(jogador.id);
      assert.notEqual(salvo.senhaHash, SENHA_VALIDA);
    });

    it('exige todos os campos', async () => {
      await assert.rejects(service.cadastrarJogador(dadosCadastro({ nome: '  ' })), {
        message: MENSAGENS.CAMPOS_OBRIGATORIOS
      });
    });

    it('exige senha com pelo menos 8 caracteres (RF002.3)', async () => {
      await assert.rejects(
        service.cadastrarJogador(dadosCadastro({ senha: '1234567', confirmacaoSenha: '1234567' })),
        { message: MENSAGENS.SENHA_CURTA }
      );
    });

    it('exige confirmação igual à senha', async () => {
      await assert.rejects(service.cadastrarJogador(dadosCadastro({ confirmacaoSenha: 'outra12345' })), {
        message: MENSAGENS.SENHAS_DIFERENTES
      });
    });

    it('rejeita apelido repetido, sem diferenciar maiúsculas (RF002.1)', async () => {
      await service.cadastrarJogador(dadosCadastro());
      await assert.rejects(
        service.cadastrarJogador(dadosCadastro({ apelido: '@MARIA', email: 'outra@exemplo.com' })),
        { message: MENSAGENS.APELIDO_EM_USO, statusHttp: 409 }
      );
    });

    it('rejeita e-mail repetido (RF002.2)', async () => {
      await service.cadastrarJogador(dadosCadastro());
      await assert.rejects(service.cadastrarJogador(dadosCadastro({ apelido: 'outra' })), {
        message: MENSAGENS.EMAIL_EM_USO
      });
    });

    it('rejeita e-mail em formato inválido', async () => {
      await assert.rejects(service.cadastrarJogador(dadosCadastro({ email: 'maria.com' })), {
        message: MENSAGENS.EMAIL_INVALIDO
      });
    });
  });

});
