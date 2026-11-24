/**
 * Rotas REST da conta do Jogador (CRUD de uma tabela).
 *
 * | Método | Caminho              | Ação                     | Requisito |
 * |--------|----------------------|--------------------------|-----------|
 * | POST   | /api/jogadores       | Cadastrar jogador        | RF002     |
 * | GET    | /api/jogadores       | Buscar jogadores (?busca)| RF003     |
 * | GET    | /api/jogadores/:id   | Consultar jogador        | RF003     |
 * | PATCH  | /api/jogadores/:id   | Alterar jogador          | RF004     |
 * | DELETE | /api/jogadores/:id   | Excluir jogador          | RF005     |
 */
import { Router } from 'express';

/**
 * Cria o roteador de jogadores ligado ao controller informado.
 * @param {import('../controllers/jogador-controller.js').JogadorController} controller
 * @returns {import('express').Router}
 */
export function criarJogadorRoutes(controller) {
  const router = Router();
  router.post('/', controller.cadastrar);
  router.get('/', controller.listar);
  router.get('/:id', controller.consultar);
  router.patch('/:id', controller.alterar);
  router.delete('/:id', controller.excluir);
  return router;
}
