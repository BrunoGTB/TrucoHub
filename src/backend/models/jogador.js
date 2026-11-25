/**
 * Modelo da entidade Jogador (tabela/coleção "jogadores").
 *
 * Campos conforme o Dicionário de Dados do Documento de Requisitos:
 * id, nome, apelido, email, senha_hash, foto_url, perfil, status,
 * data_cadastro e data_exclusao. No código os campos usam camelCase;
 * a conversão para os nomes do banco é feita nos repositories.
 */

/** Tipos de conta (campo perfil). */
export const PERFIL = Object.freeze({
  JOGADOR: 'JOGADOR',
  ADMIN: 'ADMIN'
});

/** Situações da conta (campo status). */
export const STATUS = Object.freeze({
  ATIVO: 'ATIVO',
  BANIDO: 'BANIDO'
});

/** Limites de tamanho dos campos, iguais aos do dicionário de dados. */
export const LIMITES = Object.freeze({
  NOME_MAX: 80,
  APELIDO_MAX: 30,
  EMAIL_MAX: 120,
  FOTO_URL_MAX: 255,
  SENHA_MIN: 8
});

/** Prefixo obrigatório do apelido (ex.: "@zap"). */
export const PREFIXO_APELIDO = '@';

/**
 * @typedef {object} Jogador
 * @property {string} id Identificador gerado pelo banco.
 * @property {string} nome Nome do jogador.
 * @property {string} apelido Apelido único, iniciado por "@".
 * @property {string} email E-mail único usado no login.
 * @property {string} senhaHash Hash scrypt da senha.
 * @property {string|null} fotoUrl Endereço da foto do perfil.
 * @property {string} perfil Um dos valores de PERFIL.
 * @property {string} status Um dos valores de STATUS.
 * @property {Date} dataCadastro Data e hora de criação da conta.
 * @property {Date|null} dataExclusao Preenchida na exclusão lógica (RF005.3).
 */

/**
 * Monta um novo jogador com os valores padrão do dicionário de dados.
 * O id é definido pelo repository ao gravar.
 * @param {{
 *   nome: string, apelido: string, email: string, senhaHash: string, fotoUrl?: string|null
 * }} dados
 * @returns {Omit<Jogador, 'id'>}
 * @see RF002
 */
export function criarJogador({ nome, apelido, email, senhaHash, fotoUrl = null }) {
  return {
    nome,
    apelido,
    email,
    senhaHash,
    fotoUrl,
    perfil: PERFIL.JOGADOR,
    status: STATUS.ATIVO,
    dataCadastro: new Date(),
    dataExclusao: null
  };
}

/**
 * Indica se o jogador foi excluído (exclusão lógica).
 * @param {Jogador} jogador
 * @returns {boolean}
 */
export function estaExcluido(jogador) {
  return jogador.dataExclusao !== null;
}

/**
 * Remove os dados sensíveis antes de enviar o jogador na resposta da API.
 * @param {Jogador} jogador
 * @returns {Omit<Jogador, 'senhaHash' | 'dataExclusao'>}
 */
export function paraRespostaPublica(jogador) {
  const { senhaHash, dataExclusao, ...dadosPublicos } = jogador;
  return dadosPublicos;
}
