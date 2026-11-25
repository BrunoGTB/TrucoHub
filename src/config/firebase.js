/**
 * Inicializa o Firebase Admin SDK e expõe a instância do Cloud Firestore.
 *
 * A credencial da conta de serviço do projeto Firebase pode vir de dois lugares:
 * - Variáveis FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e FIREBASE_PRIVATE_KEY,
 *   usadas no Netlify, onde não há arquivo de credencial no servidor.
 * - Arquivo JSON apontado por GOOGLE_APPLICATION_CREDENTIALS, usado no ambiente local.
 *
 * Nenhuma credencial deve ir para o Git.
 */
import { initializeApp, applicationDefault, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Escolhe a credencial: variáveis de ambiente, se existirem; senão, o arquivo JSON.
 * @returns {import('firebase-admin/app').Credential}
 */
function obterCredencial() {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
  if (FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY) {
    return cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      // A chave pode chegar com "\n" literais quando colada numa única linha.
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    });
  }
  return applicationDefault();
}

/**
 * Retorna a conexão com o Firestore, inicializando o Firebase uma única vez.
 * @returns {import('firebase-admin/firestore').Firestore}
 */
export function obterFirestore() {
  if (getApps().length === 0) {
    initializeApp({ credential: obterCredencial() });
  }
  return getFirestore();
}
