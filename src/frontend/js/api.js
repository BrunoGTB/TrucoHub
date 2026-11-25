/**
 * Funções compartilhadas pelas telas: chamada à API, mensagens de retorno,
 * leitura de formulários e o jogador em uso neste navegador.
 *
 * As telas não acessam o banco: todas as operações passam pela API REST do
 * backend (/api/jogadores), que aplica as regras de negócio.
 */

/** Endereço base da API. Relativo = mesmo servidor que entregou a página. */
const URL_API = '/api/jogadores';

/** Status HTTP de resposta sem corpo (exclusão). */
const STATUS_SEM_CONTEUDO = 204;

/** Mensagem para falha de rede ou servidor fora do ar. */
const MENSAGEM_FALHA_CONEXAO = 'Não foi possível falar com o servidor. Tente novamente.';

/** Chave do jogador em uso no armazenamento local do navegador. */
const CHAVE_JOGADOR_ATUAL = 'trucohub.jogadorAtual';

/**
 * Faz uma requisição à API e devolve o JSON da resposta.
 * Lança Error com a mensagem do backend quando a resposta não é de sucesso.
 * @param {string} caminho Caminho a partir de URL_API (ex.: "/123").
 * @param {{ metodo?: string, corpo?: object }} [opcoes]
 * @returns {Promise<any>}
 */
export async function chamarApi(caminho, { metodo = 'GET', corpo } = {}) {
  let resposta;
  try {
    resposta = await fetch(`${URL_API}${caminho}`, {
      method: metodo,
      headers: corpo ? { 'Content-Type': 'application/json' } : undefined,
      body: corpo ? JSON.stringify(corpo) : undefined
    });
  } catch {
    throw new Error(MENSAGEM_FALHA_CONEXAO);
  }
  if (resposta.status === STATUS_SEM_CONTEUDO) {
    return null;
  }
  // Sem backend (ex.: site estático sem a function), a resposta não é JSON.
  let dados;
  try {
    dados = await resposta.json();
  } catch {
    throw new Error(MENSAGEM_FALHA_CONEXAO);
  }
  if (!resposta.ok) {
    throw new Error(dados.mensagem ?? MENSAGEM_FALHA_CONEXAO);
  }
  return dados;
}

/**
 * Mostra uma mensagem de sucesso ou de erro no topo da tela (#mensagem).
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
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes.at(-1)[0] : '';
  return `${primeira}${ultima}`.toUpperCase();
}

/**
 * Cria o avatar do jogador: foto, quando houver, ou as iniciais do nome.
 * @param {{ nome: string, fotoUrl?: string|null }} jogador
 * @param {string} [classeExtra]
 * @returns {HTMLSpanElement}
 */
export function criarAvatar(jogador, classeExtra = '') {
  const avatar = document.createElement('span');
  avatar.className = `avatar ${classeExtra}`.trim();
  avatar.setAttribute('aria-hidden', 'true');
  if (jogador.fotoUrl) {
    const foto = document.createElement('img');
    foto.src = jogador.fotoUrl;
    foto.alt = '';
    foto.addEventListener('error', () => foto.replaceWith(iniciais(jogador.nome)));
    avatar.append(foto);
  } else {
    avatar.textContent = iniciais(jogador.nome);
  }
  return avatar;
}

/**
 * Jogador em uso neste navegador.
 * Enquanto não existe login, é o jogador que criou a conta aqui.
 * @returns {{ id: string, nome: string, apelido: string } | null}
 */
export function lerJogadorAtual() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_JOGADOR_ATUAL));
  } catch {
    return null;
  }
}

/**
 * Guarda (ou limpa, com null) o jogador em uso neste navegador.
 * @param {{ id: string, nome: string, apelido: string } | null} jogador
 */
export function salvarJogadorAtual(jogador) {
  try {
    if (jogador) {
      const { id, nome, apelido } = jogador;
      localStorage.setItem(CHAVE_JOGADOR_ATUAL, JSON.stringify({ id, nome, apelido }));
    } else {
      localStorage.removeItem(CHAVE_JOGADOR_ATUAL);
    }
  } catch {
    // Armazenamento bloqueado (ex.: navegação privada): segue sem lembrar.
  }
}
