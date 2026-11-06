# 🃏 TrucoHub

Sistema web para cadastro de jogadores e gerenciamento de partidas de truco, com controle de pontuação, registro de vitórias, histórico de partidas e dashboards para acompanhamento de desempenho individual e coletivo.

---

## 1. CONTEXTO DO PROBLEMA E SOLUÇÃO

### 1.1. Problema

Atualmente, a organização de campeonatos locais de truco enfrenta dificuldades relacionadas à padronização da contagem de pontos e ao acompanhamento do desempenho dos participantes.

O registro de partidas e a apuração de estatísticas, como taxa de vitórias por jogador, desempenho das duplas e rankings gerais, são frequentemente realizados manualmente ou por meio de planilhas informais.

Essa falta de padronização dificulta o gerenciamento dos campeonatos, o acompanhamento do histórico dos participantes e a identificação dos jogadores e duplas com melhor desempenho.

### 1.2. Solução

O **TrucoHub** é um sistema web desenvolvido para facilitar a organização e o gerenciamento de partidas e campeonatos de truco.

A aplicação permitirá cadastrar jogadores, organizar duplas, gerenciar mesas e registrar partidas, disponibilizando um sistema de contagem de pontos e acompanhamento dos resultados.

Além disso, o sistema contará com dashboards e estatísticas para apresentar o desempenho individual dos jogadores e coletivo das duplas, facilitando a consulta de históricos e rankings.

### 1.3. Funcionalidades previstas

- Autenticação e login de usuários.
- Cadastro e gerenciamento de jogadores.
- Cadastro e gerenciamento de duplas.
- Cadastro e gerenciamento de mesas.
- Criação e gerenciamento de partidas.
- Controle de pontuação durante as partidas.
- Registro de resultados e vitórias.
- Consulta ao histórico de partidas.
- Dashboard com estatísticas e rankings.

---

## 2. INSTRUÇÕES PARA USO

Esta seção apresentará os procedimentos necessários para instalar, configurar e utilizar o TrucoHub, considerando usuários que não participam diretamente do desenvolvimento.

### 2.1. Pré-requisitos

Os seguintes componentes serão necessários para executar a aplicação:

- Navegador web atualizado.
- Conexão com a internet.

As versões e demais dependências necessárias serão especificadas conforme a configuração final do projeto.

### 2.2. Acesso e Navegação

**Acessar o sistema**

- Abra o site [TrucoHub](https://trucohub.netlify.app)
- Vá em "Criar" e faça o Sing-up.
- Depois faça o Login com os dados Cadastrados

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

Esse comando instalará as dependências declaradas no arquivo `package.json`, caso ele esteja presente na versão final do projeto.

**Observação:** As dependências e os comandos definitivos deverão ser documentados conforme a configuração efetiva do projeto.

### 3.3. Configuração do ambiente

Configure as variáveis de ambiente e as credenciais necessárias para a integração com os serviços Firebase.

Não compartilhe arquivos contendo credenciais ou informações sensíveis no repositório público.

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
| JavaScript | ES17 | Implementação da lógica e interatividade da aplicação. |
| Node.js | 26.13.0 | Ambiente de execução JavaScript no backend. |
| Firebase CLI | 15.35.0 | Ferramenta de linha de comando para gerenciamento e configuração de serviços Firebase. |

**Observação:** O Firebase CLI é uma ferramenta de gerenciamento, não o banco de dados propriamente dito. O serviço Firebase utilizado para persistência dos dados deverá ser identificado e documentado conforme a arquitetura definitiva.

---

## 5. ORGANIZAÇÃO DO PROJETO

O TrucoHub será organizado de maneira modular, buscando facilitar a manutenção, a compreensão do código e a evolução das funcionalidades.

A estrutura definitiva deverá acompanhar a arquitetura efetivamente adotada durante a implementação.

### 5.1. Estrutura de pastas proposta

```text
TrucoHub/
│
├── public/
│   └── assets/
│       ├── images/
│       └── icons/
│
├── src/
│   ├── frontend/
│   │   ├── css/
│   │   ├── js/
│   │   └── pages/
│   │
│   ├── backend/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   │
│   └── config/
│
├── docs/
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── .gitignore
├── package.json
└── README.md
```

### 5.2. Descrição dos diretórios

- **`public/`**: arquivos estáticos utilizados pela aplicação, como imagens, ícones e outros recursos visuais.
- **`src/`**: contém o código-fonte principal do sistema.
  - **`frontend/`**: arquivos responsáveis pela interface e interação com o usuário.
  - **`backend/`**: componentes responsáveis pelas regras de negócio e processamento das requisições.
  - **`config/`**: configurações necessárias para o funcionamento da aplicação.
- **`docs/`**: documentação do projeto, incluindo requisitos, diagramas, especificações e manuais.
- **`tests/`**: arquivos relacionados aos testes automatizados.
  - **`unit/`**: testes unitários.
  - **`e2e/`**: testes automatizados de ponta a ponta.

---

## 6. EQUIPE DE DESENVOLVIMENTO

Projeto desenvolvido por:

- **Bruno dos Santos Custódio**
- **Gabriel Carvalho Batista**

O desenvolvimento será realizado de forma colaborativa, com participação dos integrantes nas diferentes etapas do processo de Engenharia de Software.

O histórico de desenvolvimento e as contribuições individuais poderão ser acompanhados por meio dos commits registrados no GitHub.

---

**TrucoHub — Organize suas partidas, acompanhe seus resultados e domine a mesa!** 🃏