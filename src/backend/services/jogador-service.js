/**
 * Regras de negócio da conta do Jogador (CRUD de uma tabela, RF002 a RF005).
 *
 * O service não conhece HTTP nem o banco: recebe um repository pelo construtor
 * (inversão de dependência) e lança erros da aplicação com mensagens em pt-BR,
 * iguais às do Documento de Requisitos.
 */
import {
  LIMITES,
  PREFIXO_APELIDO,
  criarJogador,
  estaExcluido,
  paraRespostaPublica
} from '../models/jogador.js';
import {
  ErroConflito,
  ErroNaoEncontrado,
  ErroValidacao
} from '../errors/app-error.js';
import { gerarHashSenha } from '../utils/senha.js';

/** Mensagens exibidas ao usuário. */
export const MENSAGENS = Object.freeze({
  CAMPOS_OBRIGATORIOS: 'Preencha todos os campos.',
  SENHA_CURTA: `A senha precisa ter pelo menos ${LIMITES.SENHA_MIN} caracteres.`,
  SENHAS_DIFERENTES: 'As senhas não conferem.',
  APELIDO_EM_USO: 'Este apelido já está em uso.',
  EMAIL_EM_USO: 'Já existe conta com este e-mail.',
  EMAIL_INVALIDO: 'Informe um e-mail válido.',
  APELIDO_INVALIDO: 'O apelido deve ter apenas letras, números, ponto ou sublinhado.',
  NOME_LONGO: `O nome pode ter no máximo ${LIMITES.NOME_MAX} caracteres.`,
  APELIDO_LONGO: `O apelido pode ter no máximo ${LIMITES.APELIDO_MAX} caracteres.`,
  EMAIL_LONGO: `O e-mail pode ter no máximo ${LIMITES.EMAIL_MAX} caracteres.`,
  JOGADOR_NAO_ENCONTRADO: 'Jogador não encontrado.'
});

/** Formato simples de e-mail: algo@dominio.tld, sem espaços. */
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Apelido: "@" seguido de letras, números, ponto ou sublinhado. */
const REGEX_APELIDO = /^@[\p{L}\p{N}._]+$/u;

/**
 * Remove acentos e passa para minúsculas, para a busca ignorar os dois.
 * @param {string} texto
 * @returns {string}
 */
function normalizarParaBusca(texto) {
  return texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

/**
 * Garante o prefixo "@" no apelido e remove espaços nas pontas.
 * @param {string} apelido
 * @returns {string}
 */
function normalizarApelido(apelido) {
  const apelidoLimpo = apelido.trim();
  return apelidoLimpo.startsWith(PREFIXO_APELIDO) ? apelidoLimpo : `${PREFIXO_APELIDO}${apelidoLimpo}`;
}

/**
 * Indica se o valor está vazio (undefined, null ou só espaços).
 * @param {unknown} valor
 * @returns {boolean}
 */
function estaVazio(valor) {
  return valor === undefined || valor === null || String(valor).trim() === '';
}

export class JogadorService {
  /** @type {import('../repositories/jogador-repository-memoria.js').JogadorRepositoryMemoria} */
  #repository;

  /**
   * @param {object} repository Qualquer repository com a interface de jogador
   *   (JogadorRepositoryFirestore ou JogadorRepositoryMemoria).
   */
  constructor(repository) {
    this.#repository = repository;
  }

  /**
   * Cadastra um novo jogador.
   * @param {{ nome: string, apelido: string, email: string, senha: string, confirmacaoSenha: string }} dados
   * @returns {Promise<object>} Jogador cadastrado, sem dados sensíveis.
   * @throws {ErroValidacao} Campos vazios, senha curta ou senhas diferentes.
   * @throws {ErroConflito} Apelido ou e-mail já usados (RF002.1, RF002.2).
   * @see RF002
   */
  async cadastrarJogador(dados) {
    const { nome, apelido, email, senha, confirmacaoSenha } = dados ?? {};
    if ([nome, apelido, email, senha, confirmacaoSenha].some(estaVazio)) {
      throw new ErroValidacao(MENSAGENS.CAMPOS_OBRIGATORIOS);
    }

    const nomeLimpo = this.#validarNome(nome);
    const apelidoNormalizado = this.#validarApelido(apelido);
    const emailNormalizado = this.#validarEmail(email);
    this.#validarSenha(senha, confirmacaoSenha);

    await this.#garantirApelidoDisponivel(apelidoNormalizado);
    if (await this.#repository.buscarPorEmail(emailNormalizado)) {
      throw new ErroConflito(MENSAGENS.EMAIL_EM_USO);
    }

    const novoJogador = criarJogador({
      nome: nomeLimpo,
      apelido: apelidoNormalizado,
      email: emailNormalizado,
      senhaHash: await gerarHashSenha(senha)
    });
    const jogadorSalvo = await this.#repository.inserir(novoJogador);
    return paraRespostaPublica(jogadorSalvo);
  }

  /**
   * Busca jogadores ativos cujo nome ou apelido contenha o texto informado.
   * Sem texto, lista todos os ativos. Banidos e excluídos não aparecem (RF003.4).
   * @param {string} [texto] Parte do nome ou do apelido.
   * @returns {Promise<object[]>} Jogadores ordenados pelo nome.
   * @see RF003
   */
  async buscarJogadores(texto = '') {
    const termo = normalizarParaBusca(texto.trim());
    const ativos = await this.#repository.listarAtivos();
    return ativos
      .filter((jogador) =>
        normalizarParaBusca(jogador.nome).includes(termo) ||
        normalizarParaBusca(jogador.apelido).includes(termo))
      .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
      .map(paraRespostaPublica);
  }

  /**
   * Consulta o perfil de um jogador pelo id.
   * @param {string} id
   * @returns {Promise<object>} Jogador sem dados sensíveis.
   * @throws {ErroNaoEncontrado} Jogador inexistente ou excluído.
   * @see RF003
   */
  async consultarJogador(id) {
    const jogador = await this.#obterJogadorExistente(id);
    return paraRespostaPublica(jogador);
  }

  /**
   * Busca o jogador e lança erro se ele não existir ou estiver excluído.
   * @param {string} id
   */
  async #obterJogadorExistente(id) {
    const jogador = await this.#repository.buscarPorId(id);
    if (!jogador || estaExcluido(jogador)) {
      throw new ErroNaoEncontrado(MENSAGENS.JOGADOR_NAO_ENCONTRADO);
    }
    return jogador;
  }

  /**
   * Lança erro se o apelido já pertence a outro jogador (RF002.1).
   * @param {string} apelido Apelido já normalizado.
   * @param {string} [idIgnorado] Id do próprio jogador, na alteração.
   */
  async #garantirApelidoDisponivel(apelido, idIgnorado) {
    const donoDoApelido = await this.#repository.buscarPorApelido(apelido);
    if (donoDoApelido && donoDoApelido.id !== idIgnorado) {
      throw new ErroConflito(MENSAGENS.APELIDO_EM_USO);
    }
  }

  /** @param {string} nome */
  #validarNome(nome) {
    if (estaVazio(nome)) {
      throw new ErroValidacao(MENSAGENS.CAMPOS_OBRIGATORIOS);
    }
    const nomeLimpo = String(nome).trim();
    if (nomeLimpo.length > LIMITES.NOME_MAX) {
      throw new ErroValidacao(MENSAGENS.NOME_LONGO);
    }
    return nomeLimpo;
  }

  /** @param {string} apelido */
  #validarApelido(apelido) {
    if (estaVazio(apelido)) {
      throw new ErroValidacao(MENSAGENS.CAMPOS_OBRIGATORIOS);
    }
    const apelidoNormalizado = normalizarApelido(String(apelido));
    if (apelidoNormalizado.length > LIMITES.APELIDO_MAX) {
      throw new ErroValidacao(MENSAGENS.APELIDO_LONGO);
    }
    if (!REGEX_APELIDO.test(apelidoNormalizado)) {
      throw new ErroValidacao(MENSAGENS.APELIDO_INVALIDO);
    }
    return apelidoNormalizado;
  }

  /** @param {string} email */
  #validarEmail(email) {
    const emailNormalizado = String(email).trim().toLowerCase();
    if (emailNormalizado.length > LIMITES.EMAIL_MAX) {
      throw new ErroValidacao(MENSAGENS.EMAIL_LONGO);
    }
    if (!REGEX_EMAIL.test(emailNormalizado)) {
      throw new ErroValidacao(MENSAGENS.EMAIL_INVALIDO);
    }
    return emailNormalizado;
  }

  /**
   * Valida o tamanho mínimo (RF002.3) e a confirmação da senha.
   * @param {string} senha
   * @param {string} confirmacaoSenha
   */
  #validarSenha(senha, confirmacaoSenha) {
    if (typeof senha !== 'string' || senha.length < LIMITES.SENHA_MIN) {
      throw new ErroValidacao(MENSAGENS.SENHA_CURTA);
    }
    if (senha !== confirmacaoSenha) {
      throw new ErroValidacao(MENSAGENS.SENHAS_DIFERENTES);
    }
  }

}
