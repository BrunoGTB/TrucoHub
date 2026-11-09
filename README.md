# 🃏 TrucoHub

Sistema web para jogadores de truco organizarem as próprias partidas, com contagem de pontos padronizada, registro de vitórias, histórico de partidas e ranking de jogadores e duplas.

---

## 1. CONTEXTO DO PROBLEMA E SOLUÇÃO

### 1.1. Problema

Em partidas e campeonatos informais de truco, a contagem de pontos e o acompanhamento do desempenho dos jogadores não seguem um padrão.

O registro das partidas e a apuração de estatísticas, como vitórias por jogador, desempenho das duplas e rankings, costumam ser feitos à mão ou em planilhas informais.

Sem padronização, fica difícil marcar partidas, acompanhar o histórico de cada jogador e saber quais jogadores e duplas têm o melhor desempenho.

### 1.2. Solução

O **TrucoHub** é um sistema web em que cada jogador cria a própria conta, adiciona amigos, forma duplas e marca partidas 2×2 (duplas) ou 1×1 (individual).

Durante a partida, o criador registra os pontos de cada mão (1, 3, 6, 9 ou 12) até um lado somar 12 pontos. O resultado entra automaticamente no desempenho dos jogadores e das duplas e no ranking.

Contas de Admin cuidam da moderação: banem, reativam e excluem jogadores e excluem partidas.

### 1.3. Funcionalidades (requisitos funcionais)

A especificação completa, com os casos de uso, está no [Documento de Requisitos](docs/requisitos/Documento_de_Requisitos_TrucoHub.pdf).

**Conta do Jogador**
- RF001 – Autenticar Jogador (login obrigatório para todas as funcionalidades)
- RF002 – Cadastrar Jogador
- RF003 – Consultar Jogador
- RF004 – Alterar Jogador
- RF005 – Excluir Jogador

**Amizade**
- RF006 – Enviar Pedido de Amizade
- RF007 – Responder Pedido de Amizade
- RF008 – Consultar Amigos

**Dupla**
- RF009 – Formar Dupla
- RF010 – Responder Convite de Dupla
- RF011 – Consultar Dupla

**Partida**
- RF012 – Criar Partida
- RF013 – Consultar Partida
- RF014 – Alterar Partida
- RF015 – Excluir Partida
- RF016 – Responder Convite de Partida
- RF023 – Entrar em Partida em Espera
- RF017 – Iniciar Partida
- RF018 – Registrar Pontos
- RF019 – Finalizar Partida

**Competitivo**
- RF020 – Consultar Desempenho do Jogador
- RF021 – Consultar Desempenho da Dupla
- RF022 – Exibir Ranking

**Administração**
- RF024 – Banir Jogador
- RF025 – Reativar Jogador

O CRUD de uma tabela é a conta do Jogador (RF002 a RF005). O CRUD de três tabelas é a Partida, com Dupla e Jogador (RF012 a RF015).

### 1.4. Requisitos não funcionais

| ID | Requisito |
|---|---|
| NF001 | Exibir todas as telas sem rolagem horizontal em larguras de 360 px a 1920 px. |
| NF002 | Botões e links com área clicável de no mínimo 44 × 44 px. |
| NF003 | Disponibilidade mínima de 99,0% do tempo em cada mês. |
| NF004 | Manter o placar e os lançamentos de uma partida em andamento após recarregar a página. |
| NF005 | Exibir o conteúdo principal de cada tela em até 3 s (Lighthouse 12, conexão de 10 Mbps). |
| NF006 | Mostrar aos participantes cada lançamento de pontos em até 2 s. |
| NF007 | Expirar convites sem resposta entre 180 e 190 s após o envio. |
| NF008 | Guardar senhas apenas como hash scrypt (Firebase Authentication). |
| NF009 | Trafegar os dados por HTTPS com TLS 1.2 ou superior. |
| NF010 | Encerrar a sessão após 30 minutos sem interação. |
| NF011 | Bloquear o login de um e-mail por 15 minutos após 5 senhas incorretas seguidas. |
| NF012 | Publicar o sistema no Netlify, em https://trucohub.netlify.app. |
| NF013 | Contraste de texto mínimo de 4,5:1 (WCAG 2.1, nível AA). |
| NF014 | Todos os textos da interface em português do Brasil (pt-BR). |
| NF015 | Funcionar no Chrome 120+, Firefox 120+ e Edge 120+, no Windows 10 ou superior. |
| NF016 | Funcionar no Safari 17+ (iOS 17+) e no Chrome 120+ (Android 12+). |

### 1.5. Protótipo

As 20 telas (Desktop e Mobile) estão no [Figma](https://www.figma.com/design/uCVdOtPQJ7I0i3izYB8LJE/TrucoHub---Identidade-Visual), com os fluxos de navegação. A relação entre cada tela e os requisitos que ela atende está no capítulo 4 do Documento de Requisitos.

---

## 2. INSTRUÇÕES PARA USO

Esta seção apresenta como acessar e usar o TrucoHub, para usuários que não participam do desenvolvimento.

### 2.1. Pré-requisitos

- Computador com Windows 10 ou superior e Google Chrome 120+, Mozilla Firefox 120+ ou Microsoft Edge 120+; **ou**
- Celular com iOS 17+ (Safari 17+) ou Android 12+ (Google Chrome 120+).
- Conexão com a internet.

### 2.2. Acesso e navegação

**Acessar o sistema**

1. Abra o site [TrucoHub](https://trucohub.netlify.app).
2. Clique em **Criar conta** e preencha nome, apelido, e-mail e senha (mínimo de 8 caracteres).
3. Depois, entre com o e-mail e a senha cadastrados.

**Primeiros passos**

1. Em **Amigos**, busque jogadores pelo nome ou apelido e envie pedidos de amizade.
2. Em **Duplas**, forme uma dupla com um amigo; ela vale depois que ele aceitar.
3. Em **Partidas**, crie uma partida 2×2 ou 1×1 e convide amigos, ou deixe a partida na lista de espera para qualquer jogador entrar.
4. Com todos confirmados, inicie a partida e registre os pontos de cada mão.
5. Acompanhe os resultados em **Ranking** e no seu **Perfil**.

---

## 3. INSTRUÇÕES PARA DEVS

Siga as instruções abaixo para preparar seu ambiente de desenvolvimento e contribuir com o TrucoHub.

### 3.1. Obter o código-fonte

Clone o repositório para sua máquina utilizando:

```bash
git clone https://github.com/BrunoGTB/TrucoHub
```

Entre no diretório do projeto:

```bash
cd TrucoHub
```

Alternativamente, é possível baixar o projeto em formato ZIP diretamente pelo GitHub e extrair os arquivos na máquina.

### 3.2. Instalação das dependências

Com o Node.js instalado, execute o comando abaixo no diretório do projeto:

```bash
npm install
```

Esse comando instalará as dependências declaradas no arquivo `package.json`.

### 3.3. Configuração do ambiente

Configure as variáveis de ambiente e as credenciais do projeto Firebase (Authentication e Cloud Firestore).

Não envie arquivos com credenciais ou informações sensíveis para o repositório público.

### 3.4. Execução do projeto

O comando de inicialização deverá ser definido de acordo com os scripts configurados no `package.json`.

Exemplo de comando, caso exista o script correspondente:

```bash
npm run dev
```

Após a inicialização, acesse pelo navegador a URL informada pelo servidor de desenvolvimento.

---

## 4. TECNOLOGIAS

As seguintes tecnologias foram definidas para o desenvolvimento do TrucoHub:

| Tecnologia | Versão | Finalidade |
|---|---|---|
| HTML | 5 | Estruturação das páginas web. |
| CSS | 3 | Estilização e apresentação da interface. |
| JavaScript | ES17 (ECMAScript 2026) | Implementação da lógica e interatividade da aplicação. |
| Node.js | 26.13.0 | Ambiente de execução JavaScript. |
| Firebase Authentication | — | Login com e-mail e senha. |
| Cloud Firestore | — | Banco de dados. |
| Firebase CLI | 15.35.0 | Gerenciamento e configuração dos serviços Firebase. |
| Netlify | — | Hospedagem do site. |
| Figma | — | Prototipação das telas. |

---

## 5. ORGANIZAÇÃO DO PROJETO

O TrucoHub será organizado de maneira modular, buscando facilitar a manutenção, a compreensão do código e a evolução das funcionalidades.

### 5.1. Estrutura de pastas

```text
TrucoHub/
│
├── docs/
│   └── requisitos/
│       └── Documento_de_Requisitos_TrucoHub.pdf
│
├── Padrões Adotados/
│   ├── Regras de Verificação e Analise de Requisitos.md
│   └── registros/
│       └── verificacao-2026-11-08.md
│
├── public/
│   └── assets/
│       ├── icons/
│       └── images/
│
├── src/
│   ├── backend/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   │
│   ├── config/
│   │
│   └── frontend/
│       ├── css/
│       │   └── style.css
│       ├── js/
│       │   └── script.js
│       └── pages/
│           └── index.html
│
├── tests/
│   ├── e2e/
│   └── unit/
│
├── .gitignore
└── README.md
```

### 5.2. Descrição dos diretórios

- **`docs/`**: documentação do projeto.
  - **`requisitos/`**: documento de requisitos (casos de uso, requisitos não funcionais, rastreabilidade com o protótipo e dicionário de dados).
- **`Padrões Adotados/`**: padrões da equipe, como as regras de verificação e análise de requisitos.
  - **`registros/`**: um arquivo por verificação dos requisitos, nomeado `verificacao-AAAA-MM-DD.md` com a data em que foi feita. Cada registro traz o resultado de cada requisito nas regras e o nome do revisor, que deve ser um integrante diferente do autor dos requisitos.
- **`public/`**: arquivos estáticos utilizados pela aplicação, como ícones e imagens.
- **`src/`**: contém o código-fonte principal do sistema.
  - **`backend/`**: componentes responsáveis pelas regras de negócio e processamento das requisições.
  - **`config/`**: configurações necessárias para o funcionamento da aplicação.
  - **`frontend/`**: arquivos responsáveis pela interface e interação com o usuário (estilos, scripts e páginas).
- **`tests/`**: arquivos relacionados aos testes automatizados.
  - **`e2e/`**: testes automatizados de ponta a ponta.
  - **`unit/`**: testes unitários.

---

## 6. EQUIPE DE DESENVOLVIMENTO

Projeto desenvolvido por:

- **Bruno dos Santos Custódio**
- **Gabriel Carvalho Batista**

O desenvolvimento será realizado de forma colaborativa, com participação dos integrantes nas diferentes etapas do processo de Engenharia de Software.

O histórico de desenvolvimento e as contribuições individuais poderão ser acompanhados por meio dos commits registrados no GitHub.

---

**TrucoHub — Organize suas partidas, acompanhe seus resultados e domine a mesa!** 🃏