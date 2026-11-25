/**
 * Monta a aplicação Express: middlewares, rotas da API e arquivos do frontend.
 *
 * As dependências são criadas de fora para dentro
 * (repository -> service -> controller -> routes), o que permite trocar o
 * repository nos testes sem alterar as outras camadas.
 */
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JogadorService } from './services/jogador-service.js';
import { JogadorController } from './controllers/jogador-controller.js';
import { criarJogadorRoutes } from './routes/jogador-routes.js';
import { rotaNaoEncontrada, tratarErros } from './middlewares/tratar-erros.js';

const PASTA_FRONTEND = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'frontend');

/**
 * Cria a aplicação Express.
 * @param {{ jogadorRepository: object }} dependencias Repository de jogadores a ser usado.
 * @returns {import('express').Express}
 */
export function criarApp({ jogadorRepository }) {
  const app = express();
  app.use(express.json());

  const jogadorService = new JogadorService(jogadorRepository);
  const jogadorController = new JogadorController(jogadorService);
  app.use('/api/jogadores', criarJogadorRoutes(jogadorController));
  app.use('/api', rotaNaoEncontrada);

  // Frontend estático: as páginas ficam na raiz do site, como no deploy do Netlify.
  app.use(express.static(path.join(PASTA_FRONTEND, 'pages')));
  app.use('/css', express.static(path.join(PASTA_FRONTEND, 'css')));
  app.use('/js', express.static(path.join(PASTA_FRONTEND, 'js')));

  app.use(tratarErros);
  return app;
}
