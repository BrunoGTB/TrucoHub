/**
 * Repository de jogadores em memória.
 *
 * Tem a mesma interface do JogadorRepositoryFirestore, para que o service
 * funcione igual nos dois casos. É usado nos testes automatizados e para rodar
 * o projeto localmente sem credenciais do Firebase (BANCO_DADOS=memoria).
 * Os dados se perdem quando o servidor é reiniciado.
 */
import { randomUUID } from 'node:crypto';

export class JogadorRepositoryMemoria {
  /** @type {Map<string, import('../models/jogador.js').Jogador>} */
  #jogadores = new Map();

  /**
   * Grava um novo jogador e devolve o registro com o id gerado.
   * @param {Omit<import('../models/jogador.js').Jogador, 'id'>} jogador
   * @returns {Promise<import('../models/jogador.js').Jogador>}
   */
  async inserir(jogador) {
    const jogadorSalvo = { id: randomUUID(), ...jogador };
    this.#jogadores.set(jogadorSalvo.id, jogadorSalvo);
    return { ...jogadorSalvo };
  }

  /**
   * @param {string} id
   * @returns {Promise<import('../models/jogador.js').Jogador|null>}
   */
  async buscarPorId(id) {
    const jogador = this.#jogadores.get(id);
    return jogador ? { ...jogador } : null;
  }

  /**
   * Busca pelo apelido, sem diferenciar maiúsculas e minúsculas.
   * Considera também contas excluídas, porque o apelido continua reservado.
   * @param {string} apelido
   * @returns {Promise<import('../models/jogador.js').Jogador|null>}
   */
  async buscarPorApelido(apelido) {
    return this.#buscarPorCampo('apelido', apelido.toLowerCase());
  }

  /**
   * Busca pelo e-mail (já normalizado em minúsculas pelo service).
   * @param {string} email
   * @returns {Promise<import('../models/jogador.js').Jogador|null>}
   */
  async buscarPorEmail(email) {
    return this.#buscarPorCampo('email', email.toLowerCase());
  }

  /**
   * Lista os jogadores com o status informado e sem exclusão lógica.
   * @param {string} status
   * @returns {Promise<import('../models/jogador.js').Jogador[]>}
   */
  async listarPorStatus(status) {
    return [...this.#jogadores.values()]
      .filter((jogador) => jogador.status === status && jogador.dataExclusao === null)
      .map((jogador) => ({ ...jogador }));
  }

  /**
   * Atualiza apenas os campos informados.
   * @param {string} id
   * @param {Partial<import('../models/jogador.js').Jogador>} campos
   * @returns {Promise<import('../models/jogador.js').Jogador>}
   */
  async atualizar(id, campos) {
    const jogadorAtualizado = { ...this.#jogadores.get(id), ...campos, id };
    this.#jogadores.set(id, jogadorAtualizado);
    return { ...jogadorAtualizado };
  }

  /**
   * @param {'apelido'|'email'} campo
   * @param {string} valorMinusculo
   */
  #buscarPorCampo(campo, valorMinusculo) {
    for (const jogador of this.#jogadores.values()) {
      if (jogador[campo].toLowerCase() === valorMinusculo) {
        return { ...jogador };
      }
    }
    return null;
  }
}
