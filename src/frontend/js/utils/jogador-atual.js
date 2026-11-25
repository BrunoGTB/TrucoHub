/**
 * Jogador em uso neste navegador.
 *
 * Enquanto não existe login (T01), é o jogador que criou a conta aqui. Fica no
 * localStorage, que pode estar bloqueado (ex.: navegação privada); nesse caso
 * o site segue funcionando, só sem lembrar o jogador.
 */

/** Chave do jogador em uso no armazenamento local do navegador. */
const CHAVE_JOGADOR_ATUAL = 'trucohub.jogadorAtual';

/**
 * @typedef {{ id: string, nome: string, apelido: string, fotoUrl?: string|null }} JogadorAtual
 */

/** @returns {JogadorAtual | null} */
export function lerJogadorAtual() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_JOGADOR_ATUAL));
  } catch {
    return null;
  }
}

/**
 * Guarda (ou limpa, com null) o jogador em uso.
 * @param {JogadorAtual | null} jogador
 */
export function salvarJogadorAtual(jogador) {
  try {
    if (jogador) {
      const { id, nome, apelido, fotoUrl = null } = jogador;
      localStorage.setItem(CHAVE_JOGADOR_ATUAL, JSON.stringify({ id, nome, apelido, fotoUrl }));
    } else {
      localStorage.removeItem(CHAVE_JOGADOR_ATUAL);
    }
  } catch {
    // Armazenamento bloqueado: segue sem lembrar o jogador.
  }
}

/**
 * Diz se o jogador informado é o jogador em uso.
 * @param {string} id
 * @returns {boolean}
 */
export function ehJogadorAtual(id) {
  return lerJogadorAtual()?.id === id;
}
