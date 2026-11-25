/**
 * Script da tela Criar conta (cadastro.html, tela T02 do protótipo, RF002).
 */
import { chamarApi } from './utils/api.js';
import { exibirMensagem, lerFormulario } from './utils/tela.js';
import { salvarJogadorAtual } from './utils/jogador-atual.js';

/** Tempo para o jogador ler a confirmação antes de ir para a Home. */
const ESPERA_REDIRECIONAR_MS = 1200;

const formCadastro = document.querySelector('#form-cadastro');

formCadastro.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  try {
    const jogador = await chamarApi('', { metodo: 'POST', corpo: lerFormulario(formCadastro) });
    formCadastro.reset();
    salvarJogadorAtual(jogador);
    exibirMensagem('Conta criada com sucesso! Abrindo a Home...', 'sucesso');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, ESPERA_REDIRECIONAR_MS);
  } catch (erro) {
    exibirMensagem(erro.message, 'erro');
  }
});
