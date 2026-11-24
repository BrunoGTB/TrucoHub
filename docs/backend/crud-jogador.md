# CRUD de Jogador (RF002 a RF005)

CRUD de uma tabela da Sprint 2 (item #24). Manipula a tabela/coleção `jogadores`, descrita no Dicionário de Dados do [Documento de Requisitos](../requisitos/Documento_de_Requisitos_TrucoHub.pdf).

## Como rodar

```bash
npm install
cp .env.example .env   # opcional; sem .env o banco é a memória
npm run dev
```

Abra http://localhost:3000/jogadores.html. Para rodar os testes: `npm test`.

Com `BANCO_DADOS=memoria` (padrão), os dados ficam em memória e somem ao reiniciar. Para usar o Cloud Firestore, defina `BANCO_DADOS=firestore` e aponte `GOOGLE_APPLICATION_CREDENTIALS` para o JSON da conta de serviço do Firebase (nunca envie esse arquivo para o Git).

## Camadas

```text
src/frontend/pages/jogadores.html   tela (formulários)
src/frontend/js/jogadores.js        chama a API com fetch
        │ HTTP / JSON
src/backend/routes/jogador-routes.js            mapeia URL -> método do controller
src/backend/controllers/jogador-controller.js   lê a requisição e define o status HTTP
src/backend/services/jogador-service.js         validações e regras de negócio
src/backend/repositories/jogador-repository-*.js  acesso ao banco (Firestore ou memória)
src/backend/models/jogador.js                   campos, constantes e valores padrão
src/config/                                     ambiente e inicialização do Firebase
```

Fluxo de dependências: `routes → controllers → services → repositories → Firestore`. O service recebe o repository pelo construtor (montado em `src/backend/app.js`), então os testes usam o repository em memória sem mudar o resto.

## Entidade Jogador

| Campo (código) | Campo (Firestore) | Regra |
|---|---|---|
| id | id do documento | Gerado pelo Firestore |
| nome | nome | Obrigatório, até 80 caracteres |
| apelido | apelido | Obrigatório, único, até 30 caracteres, começa com `@` (o `@` é incluído se faltar) |
| email | email | Obrigatório, único, até 120 caracteres, guardado em minúsculas, não pode ser alterado |
| senhaHash | senha_hash | Hash scrypt da senha (mínimo de 8 caracteres) |
| fotoUrl | foto_url | Opcional, endereço http/https |
| perfil | perfil | `JOGADOR` (padrão) ou `ADMIN` |
| status | status | `ATIVO` (padrão) ou `BANIDO` |
| dataCadastro | data_cadastro | Data atual no cadastro |
| dataExclusao | data_exclusao | Preenchida na exclusão (exclusão lógica) |

O Firestore guarda também `apelido_busca` (apelido em minúsculas) para checar a unicidade sem diferenciar maiúsculas.

## Endpoints

| Método | Caminho | Corpo | Sucesso | Requisito |
|---|---|---|---|---|
| POST | `/api/jogadores` | `nome, apelido, email, senha, confirmacaoSenha` | 201 + jogador | RF002 |
| GET | `/api/jogadores?busca=texto` | — | 200 + lista de jogadores ativos | RF003 |
| GET | `/api/jogadores/:id` | — | 200 + jogador | RF003 |
| PATCH | `/api/jogadores/:id` | qualquer um de `nome, apelido, fotoUrl, senha + confirmacaoSenha` | 200 + jogador | RF004 |
| DELETE | `/api/jogadores/:id` | `senha` | 204 | RF005 |

Erros respondem `{ "mensagem": "..." }` com as mensagens do Documento de Requisitos: 400 (dados inválidos), 401 (senha incorreta), 404 (jogador não encontrado ou excluído) e 409 (apelido ou e-mail em uso). As respostas nunca trazem `senhaHash`.

## Métodos por camada (para os diagramas de sequência)

| Funcionalidade | Controller | Service | Repository |
|---|---|---|---|
| Cadastrar Jogador | `cadastrar` | `cadastrarJogador(dados)` | `buscarPorApelido`, `buscarPorEmail`, `inserir` |
| Consultar Jogador (busca) | `listar` | `buscarJogadores(texto)` | `listarPorStatus('ATIVO')` |
| Consultar Jogador (perfil) | `consultar` | `consultarJogador(id)` | `buscarPorId` |
| Alterar Jogador | `alterar` | `alterarJogador(id, dados)` | `buscarPorId`, `buscarPorApelido`, `atualizar` |
| Excluir Jogador | `excluir` | `excluirJogador(id, senha)` | `buscarPorId`, `atualizar({ dataExclusao })` |

## Fora do escopo deste CRUD

- **Login (RF001)**: ainda não há sessão, então a API não verifica quem está alterando ou excluindo (RF004.1). Entra com o Firebase Authentication.
- **RF005.2**: impedir a exclusão de quem tem partida agendada ou em andamento depende da entidade Partida.
- **Upload de foto JPG/PNG**: por enquanto a foto é um endereço (URL).
