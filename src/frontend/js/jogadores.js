/**
 * Script da tela Buscar jogadores (jogadores.html, tela T05 do protótipo, RF003).
 */
import { chamarApi, criarAvatar, exibirMensagem, lerFormulario } from './api.js';

const formBusca = document.querySelector('#form-busca');
const listaJogadores = document.querySelector('#lista-jogadores');

/**
 * Cria a linha de um jogador (componente "Linha/Pessoa" do Figma).
 * @param {{ id: string, nome: string, apelido: string, fotoUrl?: string|null }} jogador
 * @returns {HTMLLIElement}
 */
function criarLinhaJogador(jogador) {
  const item = document.createElement('li');
  item.className = 'linha-pessoa';

  const textos = document.createElement('div');
  textos.className = 'textos';
  const nome = document.createElement('span');
  nome.className = 'nome';
  nome.textContent = jogador.nome;
  const apelido = document.createElement('span');
  apelido.className = 'detalhe';
  apelido.textContent = jogador.apelido;
  textos.append(nome, apelido);

  const verPerfil = document.createElement('a');
  verPerfil.className = 'acao';
  verPerfil.href = `perfil.html?id=${encodeURIComponent(jogador.id)}`;
  verPerfil.textContent = 'Ver perfil';
  verPerfil.setAttribute('aria-label', `Ver perfil de ${jogador.nome}`);

  item.append(criarAvatar(jogador), textos, verPerfil);
  return item;
}

/**
 * Busca jogadores e mostra a lista.
 * @param {string} [texto]
 */
async function buscarJogadores(texto = '') {
  const jogadores = await chamarApi(`?busca=${encodeURIComponent(texto)}`);
  listaJogadores.replaceChildren();
  if (jogadores.length === 0) {
    const itemVazio = document.createElement('li');
    itemVazio.className = 'vazio';
    itemVazio.textContent = 'Nenhum jogador encontrado.';
    listaJogadores.append(itemVazio);
    return;
  }
  listaJogadores.append(...jogadores.map(criarLinhaJogador));
}

formBusca.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  try {
    await buscarJogadores(lerFormulario(formBusca).busca);
  } catch (erro) {
    exibirMensagem(erro.message, 'erro');
  }
});

buscarJogadores().catch((erro) => exibirMensagem(erro.message, 'erro'));
