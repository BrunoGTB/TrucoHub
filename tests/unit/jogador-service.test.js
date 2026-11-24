/**
 * Testes unitários do JogadorService, usando o repository em memória.
 * Executar com: npm test
 */
import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { JogadorService, MENSAGENS } from '../../src/backend/services/jogador-service.js';
import { JogadorRepositoryMemoria } from '../../src/backend/repositories/jogador-repository-memoria.js';
import { STATUS } from '../../src/backend/models/jogador.js';

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

  describe('buscarJogadores e consultarJogador (RF003)', () => {
    it('busca por parte do nome ou do apelido, ignorando acentos', async () => {
      await service.cadastrarJogador(dadosCadastro({ nome: 'João Pereira', apelido: 'zap', email: 'j@x.com' }));
      await service.cadastrarJogador(dadosCadastro({ nome: 'Ana Lima', apelido: 'espadilha', email: 'a@x.com' }));
      assert.deepEqual((await service.buscarJogadores('joao')).map((j) => j.nome), ['João Pereira']);
      assert.deepEqual((await service.buscarJogadores('@espa')).map((j) => j.nome), ['Ana Lima']);
      assert.equal((await service.buscarJogadores('')).length, 2);
    });

    it('não mostra jogador banido na busca (RF003.4)', async () => {
      const jogador = await service.cadastrarJogador(dadosCadastro());
      await repository.atualizar(jogador.id, { status: STATUS.BANIDO });
      assert.equal((await service.buscarJogadores('maria')).length, 0);
    });

    it('consulta pelo id e retorna 404 para id inexistente', async () => {
      const jogador = await service.cadastrarJogador(dadosCadastro());
      assert.equal((await service.consultarJogador(jogador.id)).nome, 'Maria Souza');
      await assert.rejects(service.consultarJogador('id-inexistente'), {
        message: MENSAGENS.JOGADOR_NAO_ENCONTRADO,
        statusHttp: 404
      });
    });
  });

  describe('alterarJogador (RF004)', () => {
    it('altera nome, apelido e foto', async () => {
      const { id } = await service.cadastrarJogador(dadosCadastro());
      const alterado = await service.alterarJogador(id, {
        nome: 'Maria S.',
        apelido: 'mari',
        fotoUrl: 'https://exemplo.com/foto.png'
      });
      assert.equal(alterado.nome, 'Maria S.');
      assert.equal(alterado.apelido, '@mari');
      assert.equal(alterado.fotoUrl, 'https://exemplo.com/foto.png');
    });

    it('permite manter o próprio apelido', async () => {
      const { id } = await service.cadastrarJogador(dadosCadastro());
      const alterado = await service.alterarJogador(id, { apelido: '@maria' });
      assert.equal(alterado.apelido, '@maria');
    });

    it('rejeita apelido de outro jogador (RF002.1)', async () => {
      await service.cadastrarJogador(dadosCadastro({ apelido: 'zap', email: 'z@x.com' }));
      const { id } = await service.cadastrarJogador(dadosCadastro());
      await assert.rejects(service.alterarJogador(id, { apelido: 'zap' }), { message: MENSAGENS.APELIDO_EM_USO });
    });

    it('não permite alterar o e-mail', async () => {
      const { id } = await service.cadastrarJogador(dadosCadastro());
      await assert.rejects(service.alterarJogador(id, { email: 'novo@x.com' }), {
        message: MENSAGENS.EMAIL_NAO_ALTERAVEL
      });
    });

    it('troca a senha quando ela é válida', async () => {
      const { id } = await service.cadastrarJogador(dadosCadastro());
      const novaSenha = 'novaSenha456';
      await service.alterarJogador(id, { senha: novaSenha, confirmacaoSenha: novaSenha });
      await assert.rejects(service.excluirJogador(id, SENHA_VALIDA), { message: 'Senha incorreta.' });
      await service.excluirJogador(id, novaSenha);
    });

    it('rejeita alteração sem campos', async () => {
      const { id } = await service.cadastrarJogador(dadosCadastro());
      await assert.rejects(service.alterarJogador(id, {}), { message: MENSAGENS.NADA_PARA_ALTERAR });
    });
  });

  describe('excluirJogador (RF005)', () => {
    it('exige a senha (RF005.1)', async () => {
      const { id } = await service.cadastrarJogador(dadosCadastro());
      await assert.rejects(service.excluirJogador(id, ''), { message: MENSAGENS.SENHA_OBRIGATORIA_EXCLUSAO });
      await assert.rejects(service.excluirJogador(id, 'senhaErrada'), { statusHttp: 401 });
    });

    it('faz exclusão lógica: o registro fica no banco com data_exclusao (RF005.3)', async () => {
      const { id } = await service.cadastrarJogador(dadosCadastro());
      await service.excluirJogador(id, SENHA_VALIDA);
      const registro = await repository.buscarPorId(id);
      assert.ok(registro.dataExclusao instanceof Date);
      await assert.rejects(service.consultarJogador(id), { statusHttp: 404 });
      assert.equal((await service.buscarJogadores()).length, 0);
    });
  });
});
