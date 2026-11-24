/**
 * Controller de jogadores: traduz requisições HTTP em chamadas ao service
 * e define o status de cada resposta. Não contém regra de negócio.
 *
 * Os erros são repassados com next(erro) para o middleware de erros.
 * (No Express 5, erros de funções async também chegam ao middleware.)
 */

/** Status HTTP de sucesso usados pelo controller. */
const STATUS_SUCESSO = Object.freeze({
  OK: 200,
  CRIADO: 201,
  SEM_CONTEUDO: 204
});

export class JogadorController {
  /** @type {import('../services/jogador-service.js').JogadorService} */
  #service;

  /** @param {import('../services/jogador-service.js').JogadorService} service */
  constructor(service) {
    this.#service = service;
  }

  /**
   * POST /api/jogadores
   * @see RF002
   */
  cadastrar = async (req, res) => {
    const jogador = await this.#service.cadastrarJogador(req.body);
    res.status(STATUS_SUCESSO.CRIADO).location(`/api/jogadores/${jogador.id}`).json(jogador);
  };

  /**
   * GET /api/jogadores?busca=texto
   * @see RF003
   */
  listar = async (req, res) => {
    const busca = typeof req.query.busca === 'string' ? req.query.busca : '';
    const jogadores = await this.#service.buscarJogadores(busca);
    res.status(STATUS_SUCESSO.OK).json(jogadores);
  };

  /**
   * GET /api/jogadores/:id
   * @see RF003
   */
  consultar = async (req, res) => {
    const jogador = await this.#service.consultarJogador(req.params.id);
    res.status(STATUS_SUCESSO.OK).json(jogador);
  };

  /**
   * PATCH /api/jogadores/:id
   * @see RF004
   */
  alterar = async (req, res) => {
    const jogador = await this.#service.alterarJogador(req.params.id, req.body);
    res.status(STATUS_SUCESSO.OK).json(jogador);
  };

  /**
   * DELETE /api/jogadores/:id  (corpo: { "senha": "..." })
   * @see RF005
   */
  excluir = async (req, res) => {
    await this.#service.excluirJogador(req.params.id, req.body?.senha);
    res.status(STATUS_SUCESSO.SEM_CONTEUDO).end();
  };
}
