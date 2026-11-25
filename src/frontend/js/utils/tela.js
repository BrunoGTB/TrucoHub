/**
 * Funções de tela usadas por várias páginas: mensagens, formulários,
 * avatar e formatação de datas.
 */

/** Meses por extenso, para "no TrucoHub desde março de 2026". */
const FORMATO_MES_ANO = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' });

/** Horas em que a saudação muda (bom dia até 12h, boa tarde até 18h). */
const HORA_TARDE = 12;
const HORA_NOITE = 18;

/**
 * Mostra uma mensagem de sucesso ou de erro na tela (#mensagem).
 * @param {string} texto
 * @param {'sucesso'|'erro'} tipo
 */
export function exibirMensagem(texto, tipo) {
  const elemento = document.querySelector('#mensagem');
  elemento.textContent = texto;
  elemento.className = `mensagem ${tipo}`;
  elemento.hidden = false;
  elemento.scrollIntoView({ block: 'nearest' });
}

/**
 * Lê os campos de um formulário como objeto.
 * @param {HTMLFormElement} formulario
 * @returns {Record<string, string>}
 */
export function lerFormulario(formulario) {
  return Object.fromEntries(new FormData(formulario));
}

/**
 * Iniciais do nome para o avatar (ex.: "João Silva" -> "JS").
 * @param {string} nome
 * @returns {string}
 */
export function iniciais(nome = '') {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) {
    return '?';
  }
  const ultima = partes.length > 1 ? partes.at(-1)[0] : '';
  return `${partes[0][0]}${ultima}`.toUpperCase();
}

/**
 * Cria o avatar do jogador: foto, quando houver, ou as iniciais do nome.
 * @param {{ nome: string, fotoUrl?: string|null }} jogador
 * @param {string} [tamanho] Classe extra de tamanho ("medio" ou "grande").
 * @returns {HTMLSpanElement}
 */
export function criarAvatar(jogador, tamanho = '') {
  const avatar = document.createElement('span');
  avatar.className = `avatar ${tamanho}`.trim();
  avatar.setAttribute('aria-hidden', 'true');
  avatar.textContent = iniciais(jogador.nome);
  if (jogador.fotoUrl) {
    const foto = document.createElement('img');
    foto.alt = '';
    foto.addEventListener('load', () => avatar.replaceChildren(foto));
    foto.src = jogador.fotoUrl;
  }
  return avatar;
}

/**
 * Data no formato "março de 2026".
 * @param {string} dataIso
 * @returns {string}
 */
export function formatarMesAno(dataIso) {
  return FORMATO_MES_ANO.format(new Date(dataIso));
}

/**
 * Saudação conforme a hora do dia.
 * @param {Date} [agora]
 * @returns {string}
 */
export function saudacao(agora = new Date()) {
  const hora = agora.getHours();
  if (hora < HORA_TARDE) {
    return 'Bom dia';
  }
  return hora < HORA_NOITE ? 'Boa tarde' : 'Boa noite';
}
