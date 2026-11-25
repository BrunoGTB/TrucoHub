/**
 * Casca de navegação comum às telas da área logada, como no protótipo do
 * Figma: sidebar no desktop e barra inferior no mobile.
 *
 * Cada página marca a sua aba com <body data-pagina="...">. Telas internas
 * (ex.: Editar perfil) usam data-subpagina: no mobile elas têm o botão de
 * voltar no lugar da barra inferior. Os módulos que ainda não existem
 * aparecem desabilitados.
 */
import { criarAvatar } from './tela.js';
import { lerJogadorAtual, salvarJogadorAtual } from './jogador-atual.js';

/** Itens de navegação; os sem href ainda não existem. */
const ITENS = [
  { chave: 'home', rotulo: 'Home', href: 'index.html', mobile: true },
  { chave: 'amigos', rotulo: 'Amigos', href: 'jogadores.html', mobile: true },
  { chave: 'duplas', rotulo: 'Duplas', mobile: true },
  { chave: 'partidas', rotulo: 'Partidas', mobile: true },
  { chave: 'espera', rotulo: 'Em espera', mobile: false },
  { chave: 'ranking', rotulo: 'Ranking', mobile: false },
  { chave: 'perfil', rotulo: 'Perfil', href: 'perfil.html', mobile: true }
];

/**
 * Cria um ícone do Figma; a cor segue o texto (classes .icone-* no CSS).
 * @param {string} chave Nome do arquivo em /assets/icons.
 * @returns {HTMLSpanElement}
 */
export function criarIcone(chave) {
  const icone = document.createElement('span');
  icone.className = `icone icone-${chave}`;
  icone.setAttribute('aria-hidden', 'true');
  return icone;
}

/**
 * Logo compacta do Figma (símbolo + TRUCOHUB) com link para a Home.
 * @returns {HTMLAnchorElement}
 */
export function criarLogo() {
  const logo = document.createElement('a');
  logo.className = 'logo';
  logo.href = 'index.html';
  const simbolo = document.createElement('img');
  simbolo.src = 'assets/images/logo-simbolo.svg';
  simbolo.alt = '';
  simbolo.width = 34;
  simbolo.height = 30;
  const nome = document.createElement('span');
  nome.textContent = 'TRUCOHUB';
  logo.append(simbolo, nome);
  return logo;
}

/**
 * Cria um item de navegação (link, ou item desabilitado quando não tem href).
 * @param {(typeof ITENS)[number]} item
 * @param {string} classe "item-menu" (sidebar) ou "aba" (barra inferior)
 * @returns {HTMLElement}
 */
function criarItem(item, classe) {
  const elemento = document.createElement(item.href ? 'a' : 'span');
  elemento.className = classe;
  if (item.href) {
    elemento.href = item.href;
  } else {
    elemento.setAttribute('aria-disabled', 'true');
    elemento.title = 'Em breve';
  }
  if (item.chave === document.body.dataset.pagina) {
    elemento.classList.add('ativa');
    elemento.setAttribute('aria-current', 'page');
  }
  const rotulo = document.createElement('span');
  rotulo.textContent = item.rotulo;
  elemento.append(criarIcone(item.chave), rotulo);
  return elemento;
}

/**
 * Atualiza o nome e o avatar da sidebar depois de o jogador editar o perfil.
 * @param {{ nome: string, fotoUrl?: string|null }} jogador
 */
export function atualizarUsuario(jogador) {
  const bloco = document.querySelector('.usuario');
  bloco?.querySelector('.avatar').replaceWith(criarAvatar(jogador));
  const nome = bloco?.querySelector('.usuario-nome');
  if (nome) {
    nome.textContent = jogador.nome;
  }
}

/** Sai da conta: esquece o jogador em uso e volta para a Home. */
export function sair() {
  salvarJogadorAtual(null);
  window.location.href = 'index.html';
}

/**
 * Bloco do jogador no rodapé da sidebar: avatar, nome e "Sair".
 * Sem jogador em uso, mostra "Visitante" e o link para criar conta.
 * @returns {HTMLDivElement}
 */
function criarUsuario() {
  const jogador = lerJogadorAtual();
  const nome = document.createElement('div');
  nome.className = 'usuario-nome';
  nome.textContent = jogador?.nome ?? 'Visitante';
  const acao = document.createElement(jogador ? 'button' : 'a');
  acao.className = 'usuario-acao';
  if (jogador) {
    acao.type = 'button';
    acao.textContent = 'Sair';
    acao.addEventListener('click', sair);
  } else {
    acao.href = 'cadastro.html';
    acao.textContent = 'Criar conta';
  }
  const textos = document.createElement('div');
  textos.append(nome, acao);
  const bloco = document.createElement('div');
  bloco.className = 'usuario';
  bloco.append(criarAvatar(jogador ?? { nome: '' }), textos);
  return bloco;
}

/** @returns {HTMLElement} Sidebar do desktop. */
function criarSidebar() {
  const marca = document.createElement('div');
  marca.className = 'marca';
  marca.append(criarLogo());
  const menu = document.createElement('nav');
  menu.className = 'menu';
  menu.setAttribute('aria-label', 'Navegação principal');
  menu.append(...ITENS.map((item) => criarItem(item, 'item-menu')));
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.append(marca, menu, criarUsuario());
  return sidebar;
}

/** @returns {HTMLElement} Barra inferior do mobile. */
function criarBarraInferior() {
  const barra = document.createElement('nav');
  barra.className = 'barra-inferior';
  barra.setAttribute('aria-label', 'Navegação principal');
  barra.append(...ITENS.filter((item) => item.mobile).map((item) => criarItem(item, 'aba')));
  return barra;
}

/** Monta a casca em volta do <main> da página. */
function montarCasca() {
  const principal = document.querySelector('main');
  const casca = document.createElement('div');
  casca.className = 'casca';
  principal.replaceWith(casca);
  casca.append(criarSidebar(), principal);
  if (!('subpagina' in document.body.dataset)) {
    casca.append(criarBarraInferior());
  }
}

montarCasca();
