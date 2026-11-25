/**
 * Chamada à API REST do backend, usada por todas as telas.
 *
 * As telas não acessam o banco: todas as operações passam pela API
 * (/api/jogadores), que aplica as regras de negócio (BP04).
 */

/** Endereço base da API. Relativo = mesmo servidor que entregou a página. */
const URL_API = '/api/jogadores';

/** Status HTTP de resposta sem corpo (exclusão). */
const STATUS_SEM_CONTEUDO = 204;

/** Mensagem para falha de rede ou servidor fora do ar. */
const MENSAGEM_FALHA_CONEXAO = 'Não foi possível falar com o servidor. Tente novamente.';

/**
 * Envia a requisição; falha de rede vira um erro com mensagem amigável.
 * @param {string} caminho
 * @param {string} metodo
 * @param {object} [corpo]
 * @returns {Promise<Response>}
 */
async function enviar(caminho, metodo, corpo) {
  try {
    return await fetch(`${URL_API}${caminho}`, {
      method: metodo,
      headers: corpo ? { 'Content-Type': 'application/json' } : undefined,
      body: corpo ? JSON.stringify(corpo) : undefined
    });
  } catch {
    throw new Error(MENSAGEM_FALHA_CONEXAO);
  }
}

/**
 * Faz uma requisição à API e devolve o JSON da resposta.
 * Lança Error com a mensagem do backend quando a resposta não é de sucesso.
 * @param {string} caminho Caminho a partir de URL_API (ex.: "/123").
 * @param {{ metodo?: string, corpo?: object }} [opcoes]
 * @returns {Promise<any>}
 */
export async function chamarApi(caminho, { metodo = 'GET', corpo } = {}) {
  const resposta = await enviar(caminho, metodo, corpo);
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
