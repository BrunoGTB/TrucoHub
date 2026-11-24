/**
 * Repository de jogadores no Cloud Firestore (coleção "jogadores").
 *
 * É a única camada que conhece o Firestore. Converte os campos do código
 * (camelCase) para os nomes do dicionário de dados (snake_case) e vice-versa.
 */
import { Timestamp } from 'firebase-admin/firestore';

/** Nome da coleção no Firestore. */
export const COLECAO_JOGADORES = 'jogadores';

/**
 * Converte o jogador do código para o documento do Firestore.
 * Só inclui os campos presentes, para servir também em atualizações parciais.
 * O apelido também é guardado em minúsculas (apelido_busca) para a checagem de unicidade.
 * @param {Partial<import('../models/jogador.js').Jogador>} jogador
 * @returns {Record<string, unknown>}
 */
function paraDocumento(jogador) {
  const mapaCampos = {
    nome: 'nome',
    apelido: 'apelido',
    email: 'email',
    senhaHash: 'senha_hash',
    fotoUrl: 'foto_url',
    perfil: 'perfil',
    status: 'status',
    dataCadastro: 'data_cadastro',
    dataExclusao: 'data_exclusao'
  };
  const documento = {};
  for (const [campoCodigo, campoBanco] of Object.entries(mapaCampos)) {
    if (jogador[campoCodigo] !== undefined) {
      documento[campoBanco] = jogador[campoCodigo];
    }
  }
  if (jogador.apelido !== undefined) {
    documento.apelido_busca = jogador.apelido.toLowerCase();
  }
  return documento;
}

/**
 * Converte um documento do Firestore no jogador usado pelo código.
 * @param {import('firebase-admin/firestore').DocumentSnapshot} snapshot
 * @returns {import('../models/jogador.js').Jogador}
 */
function paraJogador(snapshot) {
  const dados = snapshot.data();
  const paraData = (valor) => (valor instanceof Timestamp ? valor.toDate() : valor ?? null);
  return {
    id: snapshot.id,
    nome: dados.nome,
    apelido: dados.apelido,
    email: dados.email,
    senhaHash: dados.senha_hash,
    fotoUrl: dados.foto_url ?? null,
    perfil: dados.perfil,
    status: dados.status,
    dataCadastro: paraData(dados.data_cadastro),
    dataExclusao: paraData(dados.data_exclusao)
  };
}

export class JogadorRepositoryFirestore {
  /** @type {import('firebase-admin/firestore').CollectionReference} */
  #colecao;

  /** @param {import('firebase-admin/firestore').Firestore} firestore */
  constructor(firestore) {
    this.#colecao = firestore.collection(COLECAO_JOGADORES);
  }

  /**
   * Grava um novo jogador; o Firestore gera o id do documento.
   * @param {Omit<import('../models/jogador.js').Jogador, 'id'>} jogador
   * @returns {Promise<import('../models/jogador.js').Jogador>}
   */
  async inserir(jogador) {
    const referencia = await this.#colecao.add(paraDocumento(jogador));
    return paraJogador(await referencia.get());
  }

  /**
   * @param {string} id
   * @returns {Promise<import('../models/jogador.js').Jogador|null>}
   */
  async buscarPorId(id) {
    const snapshot = await this.#colecao.doc(id).get();
    return snapshot.exists ? paraJogador(snapshot) : null;
  }

  /**
   * @param {string} apelido
   * @returns {Promise<import('../models/jogador.js').Jogador|null>}
   */
  async buscarPorApelido(apelido) {
    return this.#buscarPrimeiro('apelido_busca', apelido.toLowerCase());
  }

  /**
   * @param {string} email
   * @returns {Promise<import('../models/jogador.js').Jogador|null>}
   */
  async buscarPorEmail(email) {
    return this.#buscarPrimeiro('email', email.toLowerCase());
  }

  /**
   * Lista os jogadores com o status informado e sem exclusão lógica.
   * @param {string} status
   * @returns {Promise<import('../models/jogador.js').Jogador[]>}
   */
  async listarPorStatus(status) {
    const resultado = await this.#colecao
      .where('status', '==', status)
      .where('data_exclusao', '==', null)
      .get();
    return resultado.docs.map(paraJogador);
  }

  /**
   * Atualiza apenas os campos informados.
   * @param {string} id
   * @param {Partial<import('../models/jogador.js').Jogador>} campos
   * @returns {Promise<import('../models/jogador.js').Jogador>}
   */
  async atualizar(id, campos) {
    const referencia = this.#colecao.doc(id);
    await referencia.update(paraDocumento(campos));
    return paraJogador(await referencia.get());
  }

  /**
   * Retorna o primeiro documento em que campo == valor, ou null.
   * @param {string} campo Nome do campo no Firestore.
   * @param {string} valor
   */
  async #buscarPrimeiro(campo, valor) {
    const resultado = await this.#colecao.where(campo, '==', valor).limit(1).get();
    return resultado.empty ? null : paraJogador(resultado.docs[0]);
  }
}
