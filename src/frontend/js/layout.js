/**
 * Casca de navegação comum a todas as telas, como no protótipo do Figma:
 * sidebar no desktop e barra inferior no mobile.
 *
 * Cada página marca a sua aba com <body data-pagina="...">.
 * Os módulos que ainda não existem (Duplas, Partidas, Ranking) aparecem
 * desabilitados.
 */
import { criarAvatar, lerJogadorAtual, salvarJogadorAtual } from './api.js';
import { criarLogo } from './logo.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

/** Traços dos ícones do Figma (24×24, traço de 1.8). */
const ICONES = {
  home: ['M3 10.5L12 3L21 10.5V21H15V15H9V21H3V10.5Z'],
  amigos: [
    'M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21',
    'M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z',
    'M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13',
    'M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88'
  ],
  duplas: [
    'M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z',
    'M19 8C19 9.65685 17.6569 11 16 11C14.3431 11 13 9.65685 13 8C13 6.34315 14.3431 5 16 5C17.6569 5 19 6.34315 19 8Z',
    'M2 20C2 17 4.7 15 8 15C11.3 15 14 17 14 20',
    'M14.5 15.2C15 15.1 15.5 15 16 15C19.3 15 22 17 22 20'
  ],
  partidas: [
    'M7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3Z',
    'M12 8L15 12L12 16L9 12L12 8Z'
  ],
  ranking: [
    'M8 21H16',
    'M12 17V21',
    'M7 4H17V9C17 10.3261 16.4732 11.5979 15.5355 12.5355C14.5979 13.4732 13.3261 14 12 14C10.6739 14 9.40215 13.4732 8.46447 12.5355C7.52678 11.5979 7 10.3261 7 9V4Z',
    'M7 6H4V7C4 7.79565 4.31607 8.55871 4.87868 9.12132C5.44129 9.68393 6.20435 10 7 10',
    'M17 6H20V7C20 7.79565 19.6839 8.55871 19.1213 9.12132C18.5587 9.68393 17.7956 10 17 10'
  ],
  perfil: [
    'M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z',
    'M4 21C4 17 7.6 15 12 15C16.4 15 20 17 20 21'
  ]
};

/** Itens de navegação. desktop/mobile dizem onde cada um aparece. */
const ITENS = [
  { chave: 'home', rotulo: 'Home', href: 'index.html', mobile: true },
  { chave: 'amigos', rotulo: 'Amigos', href: 'jogadores.html', mobile: true },
  { chave: 'duplas', rotulo: 'Duplas', mobile: true },
  { chave: 'partidas', rotulo: 'Partidas', mobile: true },
  { chave: 'ranking', rotulo: 'Ranking', mobile: false },
  { chave: 'perfil', rotulo: 'Perfil', href: 'perfil.html', mobile: true }
];

/**
 * Cria o ícone em SVG; a cor segue o texto (currentColor).
 * @param {keyof typeof ICONES} chave
 * @returns {SVGSVGElement}
 */
function criarIcone(chave) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.8');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('icone');
  for (const d of ICONES[chave]) {
    const traco = document.createElementNS(SVG_NS, 'path');
    traco.setAttribute('d', d);
    svg.append(traco);
  }
  return svg;
}

/**
 * Cria um item de navegação (link, ou item desabilitado quando não tem href).
 * @param {(typeof ITENS)[number]} item
 * @param {string} classe "item-menu" (sidebar) ou "aba" (barra inferior)
 * @param {string} paginaAtual
 * @returns {HTMLElement}
 */
function criarItem(item, classe, paginaAtual) {
  const elemento = document.createElement(item.href ? 'a' : 'span');
  elemento.className = classe;
  if (item.href) {
    elemento.href = item.href;
  } else {
    elemento.setAttribute('aria-disabled', 'true');
    elemento.title = 'Em breve';
  }
  if (item.chave === paginaAtual) {
    elemento.classList.add('ativa');
    elemento.setAttribute('aria-current', 'page');
  }
  const rotulo = document.createElement('span');
  rotulo.textContent = item.rotulo;
  elemento.append(criarIcone(item.chave), rotulo);
  return elemento;
}

/**
 * Bloco do jogador no rodapé da sidebar: avatar, nome e "Sair".
 * Sem jogador em uso, mostra "Visitante" e o link para criar conta.
 * @returns {HTMLDivElement}
 */
function criarUsuario() {
  const jogador = lerJogadorAtual();
  const bloco = document.createElement('div');
  bloco.className = 'usuario';
  const textos = document.createElement('div');
  const nome = document.createElement('div');
  nome.className = 'usuario-nome';
  let acao;
  if (jogador) {
    nome.textContent = jogador.nome;
    acao = document.createElement('button');
    acao.type = 'button';
    acao.textContent = 'Sair';
    acao.addEventListener('click', () => {
      salvarJogadorAtual(null);
      window.location.href = 'index.html';
    });
  } else {
    nome.textContent = 'Visitante';
    acao = document.createElement('a');
    acao.href = 'cadastro.html';
    acao.textContent = 'Criar conta';
  }
  acao.className = 'usuario-acao';
  textos.append(nome, acao);
  bloco.append(criarAvatar(jogador ?? { nome: '' }), textos);
  return bloco;
}

/** Monta a casca em volta do <main> da página. */
function montarCasca() {
  const paginaAtual = document.body.dataset.pagina;
  const principal = document.querySelector('main');

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  const marca = document.createElement('div');
  marca.className = 'marca';
  marca.append(criarLogo());
  const menu = document.createElement('nav');
  menu.className = 'menu';
  menu.setAttribute('aria-label', 'Navegação principal');
  menu.append(...ITENS.map((item) => criarItem(item, 'item-menu', paginaAtual)));
  sidebar.append(marca, menu, criarUsuario());

  const topoMobile = document.createElement('header');
  topoMobile.className = 'topo-mobile';
  topoMobile.append(criarLogo());

  const barraInferior = document.createElement('nav');
  barraInferior.className = 'barra-inferior';
  barraInferior.setAttribute('aria-label', 'Navegação principal');
  barraInferior.append(
    ...ITENS.filter((item) => item.mobile).map((item) => criarItem(item, 'aba', paginaAtual))
  );

  const casca = document.createElement('div');
  casca.className = 'casca';
  const coluna = document.createElement('div');
  principal.replaceWith(casca);
  coluna.append(topoMobile, principal);
  casca.append(sidebar, coluna, barraInferior);
}

montarCasca();
