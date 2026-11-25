/**
 * Script da tela Buscar jogadores (jogadores.html, tela T05 do protótipo, RF003).
 */
import { chamarApi } from './utils/api.js';
import { criarAvatar, exibirMensagem } from './utils/tela.js';
import { ehJogadorAtual } from './utils/jogador-atual.js';

/** Espera depois da última tecla antes de buscar. */
const ESPERA_DIGITACAO_MS = 300;

const formBusca = document.querySelector('#form-busca');
const campoBusca = formBusca.elements.busca;
const resumoBusca = document.querySelector('#resumo-busca');
const listaJogadores = document.querySelector('#lista-jogadores');

let temporizadorBusca;

/**
 * Ação à direita da linha: "Você" no próprio jogador, "Ver perfil" nos outros.
 * @param {{ id: string, nome: string }} jogador
 * @returns {HTMLElement}
 */
function criarAcaoLinha(jogador) {
  if (ehJogadorAtual(jogador.id)) {
    const etiqueta = document.createElement('span');
    etiqueta.className = 'etiqueta sucesso';
    etiqueta.textContent = 'Você';
    return etiqueta;
  }
  const verPerfil = document.createElement('a');
  verPerfil.className = 'botao fantasma';
  verPerfil.href = `perfil.html?id=${encodeURIComponent(jogador.id)}`;
  verPerfil.textContent = 'Ver perfil';
  verPerfil.setAttribute('aria-label', `Ver perfil de ${jogador.nome}`);
  return verPerfil;
}

/**
 * Cria a linha de um jogador (componente "Linha/Pessoa" do Figma).
 * @param {{ id: string, nome: string, apelido: string, fotoUrl?: string|null }} jogador
 * @returns {HTMLLIElement}
 */
function criarLinhaJogador(jogador) {
  const nome = document.createElement('span');
  nome.className = 'nome';
  nome.textContent = jogador.nome;
  const apelido = document.createElement('span');
  apelido.className = 'detalhe';
  apelido.textContent = jogador.apelido;
  const textos = document.createElement('div');
  textos.className = 'textos';
  textos.append(nome, apelido);
  const item = document.createElement('li');
  item.className = 'linha-pessoa';
  item.append(criarAvatar(jogador), textos, criarAcaoLinha(jogador));
  return item;
}

/**
 * Texto acima da lista (ex.: '4 jogadores encontrados para "ma"').
 * @param {number} quantidade
 * @param {string} texto
 * @returns {string}
 */
function descreverResultado(quantidade, texto) {
  const plural = quantidade === 1 ? 'jogador encontrado' : 'jogadores encontrados';
  return texto ? `${quantidade} ${plural} para "${texto}"` : `${quantidade} ${plural}`;
}

/**
 * Busca jogadores e mostra a lista.
 * @param {string} [texto]
 */
async function buscarJogadores(texto = '') {
  try {
    const jogadores = await chamarApi(`?busca=${encodeURIComponent(texto)}`);
    resumoBusca.textContent = descreverResultado(jogadores.length, texto);
    listaJogadores.replaceChildren(...jogadores.map(criarLinhaJogador));
  } catch (erro) {
    exibirMensagem(erro.message, 'erro');
  }
}

formBusca.addEventListener('submit', (evento) => {
  evento.preventDefault();
  clearTimeout(temporizadorBusca);
  buscarJogadores(campoBusca.value.trim());
});

campoBusca.addEventListener('input', () => {
  clearTimeout(temporizadorBusca);
  const texto = campoBusca.value.trim();
  temporizadorBusca = setTimeout(() => buscarJogadores(texto), ESPERA_DIGITACAO_MS);
});

buscarJogadores();
