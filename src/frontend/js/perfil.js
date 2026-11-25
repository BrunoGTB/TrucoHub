/**
 * Script da tela Perfil (perfil.html, tela T07 do protótipo).
 * Consulta (RF003), altera (RF004) e exclui (RF005) a conta do jogador.
 *
 * O perfil aberto é o do parâmetro ?id= (vindo da busca) ou, sem ele,
 * o do jogador em uso neste navegador.
 */
import {
  chamarApi,
  criarAvatar,
  exibirMensagem,
  lerFormulario,
  lerJogadorAtual,
  salvarJogadorAtual
} from './api.js';

const semJogador = document.querySelector('#sem-jogador');
const conteudoPerfil = document.querySelector('#conteudo-perfil');
const formEdicao = document.querySelector('#form-edicao');
const formExclusao = document.querySelector('#form-exclusao');

const idPerfil = new URLSearchParams(window.location.search).get('id') ?? lerJogadorAtual()?.id;

/**
 * Mostra os dados do jogador no topo e no formulário de edição.
 * @param {{ id: string, nome: string, apelido: string, email: string, fotoUrl?: string|null }} jogador
 */
function preencherPerfil(jogador) {
  document.querySelector('#perfil-avatar').replaceChildren(criarAvatar(jogador, 'grande'));
  document.querySelector('#perfil-nome').textContent = jogador.nome;
  document.querySelector('#perfil-detalhe').textContent = `${jogador.apelido} · ${jogador.email}`;

  // Os valores passam a ser o padrão do formulário, para o "Desfazer alterações".
  for (const campo of ['nome', 'apelido', 'email', 'fotoUrl']) {
    formEdicao.elements[campo].defaultValue = jogador[campo] ?? '';
  }
  formEdicao.reset();

  if (lerJogadorAtual()?.id === jogador.id) {
    salvarJogadorAtual(jogador);
    // Mantém o nome da sidebar igual ao perfil recém-salvo.
    const nomeSidebar = document.querySelector('.usuario-nome');
    if (nomeSidebar) {
      nomeSidebar.textContent = jogador.nome;
    }
  }
}

/** Carrega o perfil da API; sem id, mostra o aviso de nenhum perfil. */
async function carregarPerfil() {
  if (!idPerfil) {
    semJogador.hidden = false;
    return;
  }
  try {
    preencherPerfil(await chamarApi(`/${encodeURIComponent(idPerfil)}`));
    conteudoPerfil.hidden = false;
  } catch (erro) {
    exibirMensagem(erro.message, 'erro');
    semJogador.hidden = false;
  }
}

formEdicao.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const { email, senha, confirmacaoSenha, ...alteracoes } = lerFormulario(formEdicao);
  if (senha) {
    Object.assign(alteracoes, { senha, confirmacaoSenha });
  }
  try {
    const jogador = await chamarApi(`/${encodeURIComponent(idPerfil)}`, {
      metodo: 'PATCH',
      corpo: alteracoes
    });
    preencherPerfil(jogador);
    exibirMensagem('Perfil atualizado com sucesso!', 'sucesso');
  } catch (erro) {
    exibirMensagem(erro.message, 'erro');
  }
});

formExclusao.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  try {
    await chamarApi(`/${encodeURIComponent(idPerfil)}`, {
      metodo: 'DELETE',
      corpo: lerFormulario(formExclusao)
    });
    if (lerJogadorAtual()?.id === idPerfil) {
      salvarJogadorAtual(null);
    }
    conteudoPerfil.hidden = true;
    exibirMensagem('Conta excluída.', 'sucesso');
  } catch (erro) {
    exibirMensagem(erro.message, 'erro');
  }
});

carregarPerfil();
