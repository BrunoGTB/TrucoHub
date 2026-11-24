/**
 * Script da tela de jogadores (jogadores.html).
 *
 * A tela não acessa o banco: todas as operações passam pela API REST do backend
 * (/api/jogadores), que aplica as regras de negócio.
 */

/** Endereço base da API. Vazio = mesmo servidor que entregou a página. */
const URL_API = '/api/jogadores';

/** Mensagem para falha de rede ou servidor fora do ar. */
const MENSAGEM_FALHA_CONEXAO = 'Não foi possível falar com o servidor. Tente novamente.';

const elementoMensagem = document.querySelector('#mensagem');
const formCadastro = document.querySelector('#form-cadastro');
const formBusca = document.querySelector('#form-busca');
const listaJogadores = document.querySelector('#lista-jogadores');

/**
 * Faz uma requisição à API e devolve o JSON da resposta.
 * Lança Error com a mensagem do backend quando a resposta não é de sucesso.
 * @param {string} caminho Caminho a partir de URL_API (ex.: "/123").
 * @param {{ metodo?: string, corpo?: object }} [opcoes]
 * @returns {Promise<any>}
 */
async function chamarApi(caminho, { metodo = 'GET', corpo } = {}) {
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
  // Sem backend (ex.: site estático no Netlify), a resposta não é JSON.
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
 * Mostra uma mensagem de sucesso ou de erro no topo da tela.
 * @param {string} texto
 * @param {'sucesso'|'erro'} tipo
 */
function exibirMensagem(texto, tipo) {
  elementoMensagem.textContent = texto;
  elementoMensagem.className = `mensagem ${tipo}`;
  elementoMensagem.hidden = false;
}

/**
 * Lê os campos de um formulário como objeto.
 * @param {HTMLFormElement} formulario
 * @returns {Record<string, string>}
 */
function lerFormulario(formulario) {
  return Object.fromEntries(new FormData(formulario));
}

/**
 * Busca jogadores e mostra a lista (RF003).
 * @param {string} [texto]
 */
async function buscarJogadores(texto = '') {
  const jogadores = await chamarApi(`?busca=${encodeURIComponent(texto)}`);
  listaJogadores.replaceChildren();
  if (jogadores.length === 0) {
    const itemVazio = document.createElement('li');
    itemVazio.textContent = 'Nenhum jogador encontrado.';
    listaJogadores.append(itemVazio);
    return;
  }
  for (const jogador of jogadores) {
    const item = document.createElement('li');
    const descricao = document.createElement('span');
    descricao.textContent = `${jogador.nome} (${jogador.apelido})`;
    item.append(descricao);
    listaJogadores.append(item);
  }
}

formCadastro.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  try {
    await chamarApi('', { metodo: 'POST', corpo: lerFormulario(formCadastro) });
    formCadastro.reset();
    exibirMensagem('Conta criada com sucesso!', 'sucesso');
    await buscarJogadores();
  } catch (erro) {
    exibirMensagem(erro.message, 'erro');
  }
});

formBusca.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  try {
    await buscarJogadores(lerFormulario(formBusca).busca);
  } catch (erro) {
    exibirMensagem(erro.message, 'erro');
  }
});

buscarJogadores().catch((erro) => exibirMensagem(erro.message, 'erro'));
