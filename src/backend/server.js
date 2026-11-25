/**
 * Ponto de entrada do backend: escolhe o banco conforme BANCO_DADOS
 * e sobe o servidor HTTP na porta configurada.
 *
 * Uso: npm run dev  (ou npm start)
 */
import { ambiente } from '../config/ambiente.js';
import { criarJogadorRepository } from '../config/banco-dados.js';
import { criarApp } from './app.js';

const app = criarApp({ jogadorRepository: await criarJogadorRepository() });

app.listen(ambiente.porta, () => {
  console.log(`[TrucoHub] Banco de dados: ${ambiente.bancoDados}`);
  console.log(`[TrucoHub] Servidor em http://localhost:${ambiente.porta}`);
  console.log(`[TrucoHub] Tela de jogadores: http://localhost:${ambiente.porta}/jogadores.html`);
});
