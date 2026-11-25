/**
 * Cria os repositories do banco escolhido em BANCO_DADOS.
 *
 * Usado pelo servidor local (server.js) e pela função do Netlify (netlify/functions/api.mjs),
 * para que os dois escolham o banco da mesma forma.
 */
import { ambiente, TIPO_BANCO } from './ambiente.js';
import { JogadorRepositoryMemoria } from '../backend/repositories/jogador-repository-memoria.js';

/**
 * Cria o repository de jogadores do banco configurado.
 * O Firestore é importado sob demanda, para o modo memória não exigir credenciais.
 * @returns {Promise<object>}
 */
export async function criarJogadorRepository() {
  if (ambiente.bancoDados === TIPO_BANCO.FIRESTORE) {
    const { obterFirestore } = await import('./firebase.js');
    const { JogadorRepositoryFirestore } = await import(
      '../backend/repositories/jogador-repository-firestore.js'
    );
    return new JogadorRepositoryFirestore(obterFirestore());
  }
  return new JogadorRepositoryMemoria();
}
