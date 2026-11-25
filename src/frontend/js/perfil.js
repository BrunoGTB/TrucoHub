/**
 * Script da tela Perfil do jogador (perfil.html, tela T07 do protótipo, RF003).
 *
 * O perfil aberto é o do parâmetro ?id= (vindo da busca) ou, sem ele, o do
 * jogador em uso. No próprio perfil aparecem "Editar perfil" (T17) e "Sair";
 * no perfil de outro jogador, "Adicionar amigo" (módulo ainda não existe).
 */
import { chamarApi } from './utils/api.js';
import { criarAvatar, exibirMensagem, formatarMesAno } from './utils/tela.js';
import { ehJogadorAtual, lerJogadorAtual, salvarJogadorAtual } from './utils/jogador-atual.js';
import { sair } from './utils/layout.js';

const idPerfil = new URLSearchParams(window.location.search).get('id') ?? lerJogadorAtual()?.id;

/**
 * Mostra os dados do jogador no cartão do perfil.
 * @param {{ id: string, nome: string, apelido: string, fotoUrl?: string|null,
 *           dataCadastro?: string }} jogador
 */
function preencherPerfil(jogador) {
  const proprio = ehJogadorAtual(jogador.id);
  const desde = jogador.dataCadastro
    ? ` · no TrucoHub desde ${formatarMesAno(jogador.dataCadastro)}`
    : '';
  document.querySelector('#perfil-avatar').replaceChildren(criarAvatar(jogador, 'grande'));
  document.querySelector('#perfil-nome').textContent = jogador.nome;
  document.querySelector('#perfil-detalhe').textContent = `${jogador.apelido}${desde}`;
  document.querySelector('#acoes-proprio').hidden = !proprio;
  document.querySelector('#acoes-outro').hidden = proprio;
  document.title = `${jogador.nome} | TrucoHub`;
  if (proprio) {
    salvarJogadorAtual(jogador);
  }
}

/** Carrega o perfil da API; sem id, mostra o aviso de nenhum perfil. */
async function carregarPerfil() {
  if (!idPerfil) {
    document.querySelector('#sem-jogador').hidden = false;
    return;
  }
  try {
    preencherPerfil(await chamarApi(`/${encodeURIComponent(idPerfil)}`));
    document.querySelector('#conteudo-perfil').hidden = false;
  } catch (erro) {
    exibirMensagem(erro.message, 'erro');
    document.querySelector('#sem-jogador').hidden = false;
  }
}

document.querySelector('#botao-sair').addEventListener('click', sair);

carregarPerfil();
