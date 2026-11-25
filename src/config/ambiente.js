/**
 * Lê as variáveis de ambiente usadas pelo backend e aplica valores padrão.
 *
 * As variáveis podem vir do sistema ou do arquivo .env
 * (carregado com `node --env-file=.env`, veja .env.example).
 */

/** Porta usada quando PORT não é informada. */
const PORTA_PADRAO = 3000;

/** Tipos de banco aceitos em BANCO_DADOS. */
export const TIPO_BANCO = Object.freeze({
  MEMORIA: 'memoria',
  FIRESTORE: 'firestore'
});

/**
 * Configuração do ambiente, já validada.
 * @type {{ porta: number, bancoDados: string }}
 */
export const ambiente = Object.freeze({
  porta: Number(process.env.PORT) || PORTA_PADRAO,
  bancoDados: process.env.BANCO_DADOS || TIPO_BANCO.MEMORIA
});
