/**
 * Logo compacta do protótipo do Figma (símbolo + TRUCOHUB), usada na
 * navegação e nas telas de antes do login.
 */

/** Conta as logos criadas, para gerar IDs únicos dos gradientes. */
let contadorLogo = 0;

/**
 * Cria a logo compacta como link para a página inicial.
 * @returns {HTMLAnchorElement}
 */
export function criarLogo() {
  // IDs únicos: a logo aparece duas vezes (sidebar e topo mobile) e uma delas
  // fica oculta; gradiente de um SVG oculto não pinta o outro.
  contadorLogo += 1;
  const id = `logo-${contadorLogo}`;
  const logo = document.createElement('a');
  logo.className = 'logo';
  logo.href = 'index.html';
  logo.setAttribute('aria-label', 'TrucoHub, página inicial');
  logo.innerHTML = `
    <svg width="34" height="30" viewBox="0 0 34 30" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="${id}-a" x1="2.8" y1="7" x2="29.76" y2="29.59" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FED291"/><stop offset="0.7" stop-color="#CF9642"/>
        </linearGradient>
        <linearGradient id="${id}-b" x1="0" y1="7.4" x2="28.25" y2="23.37" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FED291"/><stop offset="0.7" stop-color="#CF9642"/>
        </linearGradient>
        <linearGradient id="${id}-c" x1="13.66" y1="6.98" x2="15.09" y2="23.06" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FED291"/><stop offset="0.7" stop-color="#D49D4A"/>
        </linearGradient>
      </defs>
      <path d="M14.9358 2.83055L32.0689 6.1499C32.7071 6.27355 33.1243 6.89114 33.0006 7.52933L29.1244 27.5366C29.0008 28.1748 28.3832 28.592 27.745 28.4683L10.6119 25.149C9.97366 25.0253 9.55653 24.4077 9.68018 23.7695L13.5564 3.76223C13.68 3.12403 14.2976 2.70691 14.9358 2.83055Z" fill="#1C1C1C" stroke="url(#${id}-a)" stroke-width="1.45728"/>
      <path d="M2.03995 7.29884L18.4414 1.33592C19.0523 1.11381 19.7276 1.42901 19.9497 2.03995L26.913 21.1928C27.1351 21.8037 26.8199 22.479 26.2089 22.7012L9.80752 28.6641C9.19658 28.8862 8.52126 28.571 8.29915 27.96L1.33592 8.80721C1.11381 8.19627 1.42901 7.52095 2.03995 7.29884Z" fill="#1C1C1C" stroke="url(#${id}-b)" stroke-width="1.45728"/>
      <path d="M19.7825 20.7849L13.582 23.1936C15.4616 21.0456 14.8362 18.3177 14.2886 17.2223C10.0963 28.2868 1.2192 13.2647 11.3107 14.111C3.61933 7.9867 18.1778 2.75222 16.3786 12.2533C24.0985 6.05177 24.537 23.6255 15.5279 16.6056C15.6691 19.204 18.4231 20.4745 19.7825 20.7849Z" fill="url(#${id}-c)"/>
    </svg>
    <span>TRUCOHUB</span>`;
  return logo;
}
