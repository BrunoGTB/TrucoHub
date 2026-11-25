# Publicação no Netlify com o Firebase

O site https://trucohub.netlify.app tem duas partes, publicadas juntas pelo Netlify a cada push na `main`:

| Parte | Onde fica | Como é publicada |
|---|---|---|
| Frontend (HTML, CSS, JS) | `src/frontend/` e `public/assets/` | Copiado para `dist/` pelo comando de build do `netlify.toml`. |
| API REST (`/api/*`) | `src/backend/` | Netlify Function `netlify/functions/api.mjs`, que executa a mesma aplicação Express do servidor local. |

A função grava os dados no Cloud Firestore com o Firebase Admin SDK. Como no Netlify não existe o arquivo JSON da conta de serviço, a credencial vem de variáveis de ambiente configuradas no painel.

```text
Navegador ──► trucohub.netlify.app/cadastro.html    (arquivos estáticos)
          └─► trucohub.netlify.app/api/jogadores    (Netlify Function) ──► Cloud Firestore
```

## 1. Firebase

1. No [Console do Firebase](https://console.firebase.google.com), abra o projeto do TrucoHub.
2. Em **Firestore Database**, confirme que o banco foi criado (modo nativo).
3. Em **Configurações do projeto > Contas de serviço**, clique em **Gerar nova chave privada**. O navegador baixa um arquivo JSON.
4. Guarde esse arquivo fora do repositório. Ele dá acesso total ao banco e **nunca** deve ir para o Git, para o chat ou para issues.

O Admin SDK ignora as regras de segurança do Firestore, então nenhuma regra precisa ser liberada para a API funcionar. Como o navegador não acessa o Firestore diretamente, as regras podem ficar bloqueando tudo (`allow read, write: if false;`).

## 2. Netlify

Em **Site configuration > Environment variables > Add a variable**, crie as variáveis abaixo. Em cada uma, marque **Contains secret values** quando houver essa opção e deixe o escopo em **All scopes** (ou ao menos **Functions**).

| Variável | Valor |
|---|---|
| `BANCO_DADOS` | `firestore` |
| `FIREBASE_PROJECT_ID` | campo `project_id` do JSON |
| `FIREBASE_CLIENT_EMAIL` | campo `client_email` do JSON |
| `FIREBASE_PRIVATE_KEY` | campo `private_key` do JSON, inteiro, de `-----BEGIN PRIVATE KEY-----` até `-----END PRIVATE KEY-----` |

A chave privada pode ser colada em várias linhas ou numa linha só, com os `\n` como aparecem no JSON. As duas formas funcionam.

As variáveis só valem para deploys novos. Depois de criá-las, publique de novo em **Deploys > Trigger deploy > Deploy site**.

Sem `BANCO_DADOS=firestore`, a função usa o banco em memória, que perde os dados a cada nova execução.

## 3. Conferir

1. Abra https://trucohub.netlify.app/api/jogadores. A resposta deve ser uma lista em JSON (`[]` se ainda não houver jogadores).
2. Abra https://trucohub.netlify.app/cadastro.html, crie uma conta e veja o documento aparecer na coleção `jogadores` do Firestore.

Se aparecer `{"mensagem":"Ocorreu um erro inesperado..."}`, veja o log em **Logs > Functions > api** no Netlify. O erro `UNAUTHENTICATED` indica variável faltando ou copiada errada.

## Rodar localmente

O servidor local continua lendo o JSON indicado em `GOOGLE_APPLICATION_CREDENTIALS` (veja `.env.example` e [CRUD de Jogador](../backend/crud-jogador.md)). As variáveis `FIREBASE_*` também funcionam localmente e têm prioridade sobre o arquivo.

## Limitações

- Enquanto o login (RF001) não existir, qualquer pessoa com acesso ao site consegue usar a API.
- A primeira chamada depois de um tempo parado é mais lenta, porque o Netlify precisa iniciar a função.
