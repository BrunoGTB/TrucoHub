/**
 * Script da tela Editar perfil (editar-perfil.html, tela T17 do protótipo).
 * Altera (RF004) e exclui (RF005) a conta do jogador em uso.
 */
import { chamarApi } from './utils/api.js';
import { criarAvatar, exibirMensagem, lerFormulario } from './utils/tela.js';
import { lerJogadorAtual, salvarJogadorAtual } from './utils/jogador-atual.js';
import { atualizarUsuario } from './utils/layout.js';

/** Tempo para o jogador ler a confirmação antes de mudar de tela. */
const ESPERA_REDIRECIONAR_MS = 1200;

const formEdicao = document.querySelector('#form-edicao');
const formExclusao = document.querySelector('#form-exclusao');
const idJogador = lerJogadorAtual()?.id;

/**
 * Preenche o avatar e os campos com os dados atuais do jogador.
 * @param {{ nome: string, apelido: string, email: string, fotoUrl?: string|null }} jogador
 */
function preencherFormulario(jogador) {
  document.querySelector('#perfil-avatar').replaceChildren(criarAvatar(jogador, 'medio'));
  for (const campo of ['nome', 'apelido', 'email', 'fotoUrl']) {
    formEdicao.elements[campo].value = jogador[campo] ?? '';
  }
  formEdicao.elements.senha.value = '';
  formEdicao.elements.confirmacaoSenha.value = '';
}

/** Carrega os dados do jogador em uso; sem jogador, mostra o aviso. */
async function carregarJogador() {
  if (!idJogador) {
    document.querySelector('#sem-jogador').hidden = false;
    return;
  }
  try {
    preencherFormulario(await chamarApi(`/${encodeURIComponent(idJogador)}`));
    document.querySelector('#conteudo-edicao').hidden = false;
  } catch (erro) {
    exibirMensagem(erro.message, 'erro');
  }
}

/**
 * Monta o corpo do PATCH: sem o e-mail e, se a senha estiver vazia, sem senha.
 * @returns {Record<string, string>}
 */
function lerAlteracoes() {
  const { email, senha, confirmacaoSenha, ...alteracoes } = lerFormulario(formEdicao);
  if (senha) {
    Object.assign(alteracoes, { senha, confirmacaoSenha });
  }
  return alteracoes;
}

formEdicao.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  try {
    const jogador = await chamarApi(`/${encodeURIComponent(idJogador)}`, {
      metodo: 'PATCH',
      corpo: lerAlteracoes()
    });
    salvarJogadorAtual(jogador);
    atualizarUsuario(jogador);
    preencherFormulario(jogador);
    exibirMensagem('Perfil atualizado com sucesso!', 'sucesso');
  } catch (erro) {
    exibirMensagem(erro.message, 'erro');
  }
});

formExclusao.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  try {
    await chamarApi(`/${encodeURIComponent(idJogador)}`, {
      metodo: 'DELETE',
      corpo: lerFormulario(formExclusao)
    });
    salvarJogadorAtual(null);
    document.querySelector('#conteudo-edicao').hidden = true;
    exibirMensagem('Conta excluída. Voltando para a Home...', 'sucesso');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, ESPERA_REDIRECIONAR_MS);
  } catch (erro) {
    exibirMensagem(erro.message, 'erro');
  }
});

document.querySelector('#botao-trocar-foto').addEventListener('click', () => {
  const campoFoto = document.querySelector('#campo-foto');
  campoFoto.hidden = false;
  campoFoto.querySelector('input').focus();
});

carregarJogador();
