/**
 * Geração e verificação de hash de senha com scrypt (NF008),
 * usando apenas o módulo nativo node:crypto.
 *
 * Formato armazenado em senha_hash: "<salt em hex>:<hash em hex>".
 */
import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);

/** Tamanho do salt aleatório, em bytes. */
const TAMANHO_SALT_BYTES = 16;

/** Tamanho do hash gerado pelo scrypt, em bytes. */
const TAMANHO_HASH_BYTES = 64;

/** Separador entre o salt e o hash no texto armazenado. */
const SEPARADOR = ':';

/**
 * Gera o hash de uma senha com um salt aleatório.
 * @param {string} senha Senha em texto puro.
 * @returns {Promise<string>} Texto no formato "salt:hash".
 * @see NF008
 */
export async function gerarHashSenha(senha) {
  const salt = randomBytes(TAMANHO_SALT_BYTES).toString('hex');
  const hash = await scryptAsync(senha, salt, TAMANHO_HASH_BYTES);
  return `${salt}${SEPARADOR}${hash.toString('hex')}`;
}

/**
 * Confere se a senha informada corresponde ao hash armazenado.
 * A comparação usa timingSafeEqual para não vazar informação pelo tempo de resposta.
 * @param {string} senha Senha em texto puro.
 * @param {string} senhaHash Texto "salt:hash" salvo no banco.
 * @returns {Promise<boolean>} true se a senha confere.
 */
export async function verificarSenha(senha, senhaHash) {
  const [salt, hashSalvo] = senhaHash.split(SEPARADOR);
  const hashInformado = await scryptAsync(senha, salt, TAMANHO_HASH_BYTES);
  return timingSafeEqual(Buffer.from(hashSalvo, 'hex'), hashInformado);
}
