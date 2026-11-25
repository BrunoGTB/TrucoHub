/**
 * Erros esperados da aplicação (validação, regra de negócio, registro não encontrado).
 * O middleware de erros converte cada um no status HTTP correspondente.
 */

/** Códigos de status HTTP usados pelos erros da aplicação. */
export const STATUS_HTTP = Object.freeze({
  REQUISICAO_INVALIDA: 400,
  NAO_AUTORIZADO: 401,
  NAO_ENCONTRADO: 404,
  CONFLITO: 409,
  ERRO_INTERNO: 500
});

/** Erro com mensagem para o usuário (pt-BR) e status HTTP. */
export class AppError extends Error {
  /**
   * @param {string} mensagem Mensagem exibida ao usuário.
   * @param {number} statusHttp Status HTTP da resposta.
   */
  constructor(mensagem, statusHttp) {
    super(mensagem);
    this.name = 'AppError';
    this.statusHttp = statusHttp;
  }
}

/** Dados inválidos enviados pelo usuário (HTTP 400). */
export class ErroValidacao extends AppError {
  /** @param {string} mensagem */
  constructor(mensagem) {
    super(mensagem, STATUS_HTTP.REQUISICAO_INVALIDA);
    this.name = 'ErroValidacao';
  }
}

/** Senha incorreta ao confirmar uma ação (HTTP 401). */
export class ErroSenhaIncorreta extends AppError {
  constructor() {
    super('Senha incorreta.', STATUS_HTTP.NAO_AUTORIZADO);
    this.name = 'ErroSenhaIncorreta';
  }
}

/** Registro inexistente ou excluído (HTTP 404). */
export class ErroNaoEncontrado extends AppError {
  /** @param {string} mensagem */
  constructor(mensagem) {
    super(mensagem, STATUS_HTTP.NAO_ENCONTRADO);
    this.name = 'ErroNaoEncontrado';
  }
}

/** Violação de unicidade, como apelido ou e-mail repetido (HTTP 409). */
export class ErroConflito extends AppError {
  /** @param {string} mensagem */
  constructor(mensagem) {
    super(mensagem, STATUS_HTTP.CONFLITO);
    this.name = 'ErroConflito';
  }
}
