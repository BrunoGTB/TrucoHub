/**
 * Inicializa o Firebase Admin SDK e expõe a instância do Cloud Firestore.
 *
 * A credencial vem do arquivo apontado por GOOGLE_APPLICATION_CREDENTIALS
 * (conta de serviço do projeto Firebase). Esse arquivo nunca deve ir para o Git.
 */
import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Retorna a conexão com o Firestore, inicializando o Firebase uma única vez.
 * @returns {import('firebase-admin/firestore').Firestore}
 */
export function obterFirestore() {
  if (getApps().length === 0) {
    initializeApp({ credential: applicationDefault() });
  }
  return getFirestore();
}
