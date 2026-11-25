/**
 * Script da Home (index.html, tela T03 do protótipo).
 * Personaliza a saudação e os atalhos para o jogador em uso.
 */
import { lerJogadorAtual } from './api.js';

const jogador = lerJogadorAtual();

if (jogador) {
  document.querySelector('#saudacao').textContent = `Olá, ${jogador.nome.split(' ')[0]}!`;
  const acaoPrincipal = document.querySelector('#acao-principal');
  acaoPrincipal.textContent = 'Buscar jogadores';
  acaoPrincipal.href = 'jogadores.html';
} else {
  document.querySelector('#atalho-perfil .detalhe').textContent = 'Crie sua conta para ter um perfil';
  document.querySelector('#atalho-perfil').href = 'cadastro.html';
}
