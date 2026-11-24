/**
 * Ponto de entrada do backend: escolhe o banco conforme BANCO_DADOS
 * e sobe o servidor HTTP na porta configurada.
 *
 * Uso: npm run dev  (ou npm start)
 */
import { ambiente, TIPO_BANCO } from '../config/ambiente.js';
import { criarApp } from './app.js';
import { JogadorRepositoryMemoria } from './repositories/jogador-repository-memoria.js';

/**
 * Cria o repository de jogadores do banco configurado.
 * O Firestore é importado sob demanda, para o modo memória não exigir credenciais.
 * @returns {Promise<object>}
 */
async function criarJogadorRepository() {
  if (ambiente.bancoDados === TIPO_BANCO.FIRESTORE) {
    const { obterFirestore } = await import('../config/firebase.js');
    const { JogadorRepositoryFirestore } = await import('./repositories/jogador-repository-firestore.js');
    return new JogadorRepositoryFirestore(obterFirestore());
  }
  return new JogadorRepositoryMemoria();
}

const app = criarApp({ jogadorRepository: await criarJogadorRepository() });

app.listen(ambiente.porta, () => {
  console.log(`[TrucoHub] Banco de dados: ${ambiente.bancoDados}`);
  console.log(`[TrucoHub] Servidor em http://localhost:${ambiente.porta}`);
  console.log(`[TrucoHub] Tela de jogadores: http://localhost:${ambiente.porta}/jogadores.html`);
});
