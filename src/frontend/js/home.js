/**
 * Script da Home (index.html, tela T03 do protótipo).
 * Personaliza a saudação e a ação principal para o jogador em uso.
 */
import { saudacao } from './utils/tela.js';
import { lerJogadorAtual } from './utils/jogador-atual.js';

const jogador = lerJogadorAtual();

if (jogador) {
  const primeiroNome = jogador.nome.split(' ')[0];
  document.querySelector('#saudacao').textContent = `${saudacao()}, ${primeiroNome}`;
  document.querySelector('#resumo').textContent = 'Partidas e convites chegam em breve.';
  document.querySelector('#acao-principal').hidden = true;
  document.querySelector('#nova-partida').hidden = false;
}
