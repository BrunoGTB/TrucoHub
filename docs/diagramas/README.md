# Diagramas de design do TrucoHub (Sprint 2)

Diagramas dos itens #19 (classes de domínio e pacotes), #20 (sequência) e #25 (implantação) da Sprint 2.

## Índice

| Arquivo | Diagrama | Item |
|---|---|---|
| [01-classes-dominio](#01-classes-dominio) | Diagrama de Classes de Domínio | #19 |
| [02-pacotes](#02-pacotes) | Diagrama de Pacotes (front-end e back-end) | #19 |
| [03-seq-cadastrar-jogador](#03-seq-cadastrar-jogador) | Sequência: RF002 Cadastrar Jogador (CRUD 1 tabela, C) | #20 |
| [04-seq-consultar-jogador](#04-seq-consultar-jogador) | Sequência: RF003 Consultar Jogador (CRUD 1 tabela, R) | #20 |
| [05-seq-alterar-jogador](#05-seq-alterar-jogador) | Sequência: RF004 Alterar Jogador (CRUD 1 tabela, U) | #20 |
| [06-seq-excluir-jogador](#06-seq-excluir-jogador) | Sequência: RF005 Excluir Jogador (CRUD 1 tabela, D) | #20 |
| [07-seq-criar-partida](#07-seq-criar-partida) | Sequência: RF012 Criar Partida (CRUD 3 tabelas, C) | #20 |
| [08-seq-consultar-partida](#08-seq-consultar-partida) | Sequência: RF013 Consultar Partida (CRUD 3 tabelas, R) | #20 |
| [09-seq-alterar-partida](#09-seq-alterar-partida) | Sequência: RF014 Alterar Partida (CRUD 3 tabelas, U) | #20 |
| [10-seq-excluir-partida](#10-seq-excluir-partida) | Sequência: RF015 Excluir Partida (CRUD 3 tabelas, D) | #20 |
| [11-implantacao](#11-implantacao) | Diagrama de Implantação | #25 |

## Decisões de modelagem

- **Base:** o dicionário de dados do [Documento de Requisitos](../requisitos/Documento_de_Requisitos_TrucoHub.pdf) (capítulo 5) e a estrutura de pastas do README.
- **Administrador:** `Administrador` herda de `Jogador`, porque todo administrador também é um jogador, com as mesmas informações e funcionalidades e mais as de moderação (RF024 e RF025). No banco não existe tabela separada: é a mesma coleção `jogadores`, e o campo `perfil` (`JOGADOR` ou `ADMIN`) indica qual é o caso, como no dicionário de dados.
- **Herança de partida:** `PartidaDuplas` (2×2) e `PartidaIndividual` (1×1) herdam de `Partida` (no banco, uma só coleção `partidas`, com o campo `tipo`).
- **Camadas do back-end:** `routes` → `controllers` → `services` → `repositories` → Firestore, com `models` (entidades e regras de formato) e `utils` (hash scrypt da senha). Os nomes dos arquivos seguem o padrão kebab-case do CRUD de Jogador (#24).
- **CRUD de 1 tabela:** Jogador (RF002 a RF005). A exclusão é lógica: preenche `data_exclusao`.
- **CRUD de 3 tabelas:** Partida, com Dupla e Jogador (RF012 a RF015). `convite_partida` aparece como tabela intermediária.
- **Diagramas de sequência simplificados:** mostram só o fluxo principal, sem `loop` nem `alt`, como pede a sprint.
- **Implantação:** front-end estático na CDN do Netlify (NF012), API Node.js em Netlify Functions e banco no Cloud Firestore, tudo por HTTPS com TLS 1.2+ (NF009).

<a id="01-classes-dominio"></a>

## Diagrama de Classes de Domínio

PNG: [imagens/01-classes-dominio.png](imagens/01-classes-dominio.png)

```mermaid
---
title: "TrucoHub - Diagrama de Classes de Domínio"
---
classDiagram
    direction TB

    class Jogador {
        -idJogador: int
        -nome: string
        -apelido: string
        -email: string
        -senhaHash: string
        -fotoUrl: string
        -perfil: Perfil = JOGADOR
        -status: StatusConta = ATIVO
        -dataCadastro: DateTime
        -dataExclusao: DateTime
        +enviarPedidoAmizade(destinatario: Jogador) Amizade
        +formarDupla(parceiro: Jogador, nome: string) Dupla
        +criarPartida(tipo: string, dataHora: DateTime) Partida
    }

    class Administrador {
        +banirJogador(jogador: Jogador) void
        +reativarJogador(jogador: Jogador) void
        +excluirPartida(partida: Partida) void
    }

    class Amizade {
        -idAmizade: int
        -status: StatusAmizade
        -dataPedido: DateTime
        -dataResposta: DateTime
        +aceitar() void
    }

    class Dupla {
        -idDupla: int
        -nome: string
        -status: StatusDupla
        -dataCriacao: DateTime
        -dataExpiracao: DateTime
        +ativar() void
    }

    class Partida {
        <<abstract>>
        -idPartida: int
        -dataHoraAgendada: DateTime
        -limitePontos: int = 12
        -pontosA: int = 0
        -pontosB: int = 0
        -status: StatusPartida
        -ladoVencedor: Lado
        -dataHoraInicio: DateTime
        -dataHoraFim: DateTime
        +iniciar() void
        +registrarPontos(lado: Lado, valor: int) Lancamento
        +desfazerUltimoLancamento() void
        +finalizar() void
    }

    class PartidaDuplas {
        -tipo: string = "2x2"
    }

    class PartidaIndividual {
        -tipo: string = "1x1"
    }

    class ConvitePartida {
        -idConvite: int
        -status: StatusConvite
        -dataEnvio: DateTime
        -dataExpiracao: DateTime
        -dataResposta: DateTime
        +aceitar() void
        +recusar() void
    }

    class Lancamento {
        -idLancamento: int
        -lado: Lado
        -valor: int
        -ordem: int
        -dataHora: DateTime
    }

    class Perfil {
        <<enumeration>>
        JOGADOR
        ADMIN
    }
    class StatusConta {
        <<enumeration>>
        ATIVO
        BANIDO
    }
    class StatusAmizade {
        <<enumeration>>
        PENDENTE
        ACEITA
    }
    class StatusDupla {
        <<enumeration>>
        PENDENTE
        ATIVA
    }
    class StatusPartida {
        <<enumeration>>
        EM_ESPERA
        AGENDADA
        EM_ANDAMENTO
        FINALIZADA
        CANCELADA
    }
    class StatusConvite {
        <<enumeration>>
        PENDENTE
        ACEITO
        RECUSADO
        EXPIRADO
    }
    class Lado {
        <<enumeration>>
        A
        B
    }

    %% Herança
    Jogador <|-- Administrador
    Partida <|-- PartidaDuplas
    Partida <|-- PartidaIndividual

    %% Associações com multiplicidades
    Jogador "1" -- "0..*" Amizade : solicita
    Jogador "1" -- "0..*" Amizade : recebe
    Jogador "2" -- "0..*" Dupla : forma
    Jogador "1" -- "0..*" Partida : cria
    PartidaDuplas "0..*" -- "1" Dupla : lado A
    PartidaDuplas "0..*" -- "0..1" Dupla : lado B
    PartidaIndividual "0..*" -- "1" Jogador : lado A
    PartidaIndividual "0..*" -- "0..1" Jogador : lado B
    Partida "1" -- "0..*" ConvitePartida : gera
    Jogador "1" -- "0..*" ConvitePartida : recebe
    Partida "1" *-- "0..*" Lancamento : registra
    Administrador "0..*" -- "0..*" Jogador : modera
```

<a id="02-pacotes"></a>

## Diagrama de Pacotes (front-end e back-end)

PNG: [imagens/02-pacotes.png](imagens/02-pacotes.png)

```mermaid
---
title: "TrucoHub - Diagrama de Pacotes"
---
flowchart TB
    subgraph TRUCOHUB["📦 TrucoHub"]
        direction TB
        subgraph FRONT["📦 src/frontend  (front-end)"]
            direction LR
            PAGES["📁 pages<br/><i>telas HTML</i><br/>index.html, jogadores.html, partidas.html"]
            JS["📁 js<br/><i>scripts das telas</i><br/>jogadores.js, partidas.js"]
            CSS["📁 css<br/><i>estilos</i><br/>style.css, jogadores.css"]
        end
        ASSETS["📁 public/assets<br/><i>ícones e imagens</i>"]
        subgraph BACK["📦 src/backend  (back-end)"]
            direction TB
            APP["📄 app.js, server.js<br/><i>monta o Express e injeta as dependências</i>"]
            ROUTES["📁 routes<br/>jogador-routes.js, partida-routes.js"]
            CTRL["📁 controllers<br/>jogador-controller.js, partida-controller.js"]
            SERV["📁 services<br/>jogador-service.js, partida-service.js"]
            REPO["📁 repositories<br/>jogador-repository-firestore.js, jogador-repository-memoria.js,<br/>dupla-repository-firestore.js,<br/>partida-repository-firestore.js, convite-partida-repository-firestore.js"]
            MODELS["📁 models<br/>jogador.js, dupla.js, partida.js, convite-partida.js"]
            UTILS["📁 utils<br/>senha.js"]
            MIDDLE["📁 middlewares<br/>tratar-erros.js"]
            ERRORS["📁 errors<br/>app-error.js"]
        end
        CONFIG["📁 src/config<br/>firebase.js, ambiente.js"]
        TESTS["📁 tests<br/>unit, e2e"]
    end
    FIREBASE[["📦 Firebase SDK<br/><i>biblioteca externa</i>"]]

    PAGES -.->|«use»| JS
    PAGES -.->|«use»| CSS
    PAGES -.->|«use»| ASSETS
    JS -.->|«use» HTTP /api| ROUTES
    APP -.->|«import»| ROUTES
    APP -.->|«import»| MIDDLE
    APP -.->|«import»| CONFIG
    ROUTES -.->|«import»| CTRL
    CTRL -.->|«import»| SERV
    SERV -.->|«import»| REPO
    SERV -.->|«import»| MODELS
    SERV -.->|«import»| UTILS
    SERV -.->|«import»| ERRORS
    MIDDLE -.->|«import»| ERRORS
    REPO -.->|«import»| MODELS
    REPO -.->|«import»| CONFIG
    CONFIG -.->|«import»| FIREBASE
    TESTS -.->|«import»| SERV
    TESTS -.->|«import»| REPO

    classDef pkg fill:#fff8dc,stroke:#8a6d3b,color:#222
    classDef ext fill:#eef3ff,stroke:#3b5998,color:#222
    class APP,MIDDLE,ERRORS,PAGES,JS,CSS,ASSETS,ROUTES,CTRL,SERV,REPO,MODELS,UTILS,CONFIG,TESTS pkg
    class FIREBASE ext
```

<a id="03-seq-cadastrar-jogador"></a>

## Sequência: RF002 Cadastrar Jogador (CRUD 1 tabela, C)

PNG: [imagens/03-seq-cadastrar-jogador.png](imagens/03-seq-cadastrar-jogador.png)

```mermaid
---
title: "RF002 - Cadastrar Jogador (CRUD de 1 tabela - Create)"
---
sequenceDiagram
    autonumber
    actor U as Jogador
    participant T as «view»<br/>T02 Criar conta<br/>jogadores.html
    participant S as «script»<br/>jogadores.js
    participant R as «route»<br/>jogador-routes.js
    participant C as «controller»<br/>jogador-controller.js
    participant SV as «service»<br/>jogador-service.js
    participant H as «util»<br/>senha.js
    participant M as «model»<br/>jogador.js
    participant RP as «repository»<br/>jogador-repository-firestore.js
    participant DB as «database»<br/>Firestore: jogadores

    U->>T: preenche nome, apelido, e-mail, senha e clica em "Criar conta"
    T->>S: onSubmit(formulario)
    S->>S: validarFormulario(dados)
    S->>R: fetch POST /api/jogadores {nome, apelido, email, senha}
    R->>C: cadastrar(req, res)
    C->>SV: cadastrarJogador(dados)
    SV->>RP: buscarPorApelido(apelido)
    RP->>DB: where("apelido", "==", apelido).get()
    DB-->>RP: nenhum documento
    RP-->>SV: null
    SV->>RP: buscarPorEmail(email)
    RP->>DB: where("email", "==", email).get()
    DB-->>RP: nenhum documento
    RP-->>SV: null
    SV->>H: gerarHashSenha(senha)
    H-->>SV: senha_hash (scrypt)
    SV->>M: criarJogador({nome, apelido, email, senha_hash})
    M-->>SV: jogador (perfil JOGADOR, status ATIVO, data_cadastro)
    SV->>RP: inserir(jogador)
    RP->>DB: collection("jogadores").add(jogador)
    DB-->>RP: id_jogador
    RP-->>SV: jogador salvo
    SV->>M: paraRespostaPublica(jogador)
    M-->>SV: jogador sem senha_hash
    SV-->>C: jogador
    C-->>R: res.status(201).json(jogador)
    R-->>S: 201 Created + JSON
    S->>T: exibirMensagem("Conta criada com sucesso!")
    T-->>U: apresenta T03 Home
```

<a id="04-seq-consultar-jogador"></a>

## Sequência: RF003 Consultar Jogador (CRUD 1 tabela, R)

PNG: [imagens/04-seq-consultar-jogador.png](imagens/04-seq-consultar-jogador.png)

```mermaid
---
title: "RF003 - Consultar Jogador (CRUD de 1 tabela - Read)"
---
sequenceDiagram
    autonumber
    actor U as Jogador
    participant T as «view»<br/>T05 Buscar jogadores<br/>jogadores.html
    participant S as «script»<br/>jogadores.js
    participant R as «route»<br/>jogador-routes.js
    participant C as «controller»<br/>jogador-controller.js
    participant SV as «service»<br/>jogador-service.js
    participant M as «model»<br/>jogador.js
    participant RP as «repository»<br/>jogador-repository-firestore.js
    participant DB as «database»<br/>Firestore: jogadores

    U->>T: digita parte do nome ou do apelido
    T->>S: onBuscar(texto)
    S->>R: fetch GET /api/jogadores?busca=texto
    R->>C: listar(req, res)
    C->>SV: buscarJogadores(texto)
    SV->>RP: listarAtivos()
    RP->>DB: where("status", "==", "ATIVO").get()
    DB-->>RP: documentos
    RP-->>SV: jogadores ativos
    SV->>SV: filtrar por nome ou apelido que contenha o texto
    SV->>M: paraRespostaPublica(jogadores)
    M-->>SV: lista sem senha_hash
    SV-->>C: lista de jogadores
    C-->>R: res.status(200).json(lista)
    R-->>S: 200 OK + JSON
    S->>T: renderizarLista(lista)
    T-->>U: apresenta nome e apelido de cada jogador
    U->>T: clica em um jogador
    T->>S: onSelecionar(idJogador)
    S->>R: fetch GET /api/jogadores/:id
    R->>C: consultar(req, res)
    C->>SV: consultarJogador(id)
    SV->>RP: buscarPorId(id)
    RP->>DB: doc("jogadores/" + id).get()
    DB-->>RP: documento
    RP-->>SV: jogador
    SV->>M: paraRespostaPublica(jogador)
    M-->>SV: jogador sem senha_hash
    SV-->>C: jogador
    C-->>R: res.status(200).json(jogador)
    R-->>S: 200 OK + JSON
    S->>T: renderizarPerfil(jogador)
    T-->>U: apresenta T07 Perfil do jogador
```

<a id="05-seq-alterar-jogador"></a>

## Sequência: RF004 Alterar Jogador (CRUD 1 tabela, U)

PNG: [imagens/05-seq-alterar-jogador.png](imagens/05-seq-alterar-jogador.png)

```mermaid
---
title: "RF004 - Alterar Jogador (CRUD de 1 tabela - Update)"
---
sequenceDiagram
    autonumber
    actor U as Jogador
    participant T as «view»<br/>T17 Editar perfil<br/>jogadores.html
    participant S as «script»<br/>jogadores.js
    participant R as «route»<br/>jogador-routes.js
    participant C as «controller»<br/>jogador-controller.js
    participant SV as «service»<br/>jogador-service.js
    participant H as «util»<br/>senha.js
    participant M as «model»<br/>jogador.js
    participant RP as «repository»<br/>jogador-repository-firestore.js
    participant DB as «database»<br/>Firestore: jogadores

    U->>T: altera foto, nome, apelido ou senha e clica em "Salvar"
    T->>S: onSalvar(formulario)
    S->>S: validarFormulario(dados)
    S->>R: fetch PATCH /api/jogadores/:id {nome, apelido, fotoUrl, senha}
    R->>C: alterar(req, res)
    C->>SV: alterarJogador(id, dados)
    SV->>RP: buscarPorId(id)
    RP->>DB: doc("jogadores/" + id).get()
    DB-->>RP: documento
    RP-->>SV: jogador atual
    SV->>RP: buscarPorApelido(novoApelido)
    RP->>DB: where("apelido", "==", novoApelido).get()
    DB-->>RP: nenhum documento
    RP-->>SV: null (apelido livre)
    SV->>H: gerarHashSenha(novaSenha)
    H-->>SV: novo senha_hash
    SV->>RP: atualizar(id, alteracoes)
    RP->>DB: doc("jogadores/" + id).update(alteracoes)
    DB-->>RP: ok
    RP-->>SV: jogador atualizado
    SV->>M: paraRespostaPublica(jogador)
    M-->>SV: jogador sem senha_hash
    SV-->>C: jogador
    C-->>R: res.status(200).json(jogador)
    R-->>S: 200 OK + JSON
    S->>T: exibirMensagem("Perfil atualizado com sucesso!")
    T-->>U: apresenta T07 Perfil do jogador
```

<a id="06-seq-excluir-jogador"></a>

## Sequência: RF005 Excluir Jogador (CRUD 1 tabela, D)

PNG: [imagens/06-seq-excluir-jogador.png](imagens/06-seq-excluir-jogador.png)

```mermaid
---
title: "RF005 - Excluir Jogador (CRUD de 1 tabela - Delete, exclusão lógica)"
---
sequenceDiagram
    autonumber
    actor U as Jogador
    participant T as «view»<br/>T07 Perfil do jogador<br/>jogadores.html
    participant S as «script»<br/>jogadores.js
    participant R as «route»<br/>jogador-routes.js
    participant C as «controller»<br/>jogador-controller.js
    participant SV as «service»<br/>jogador-service.js
    participant H as «util»<br/>senha.js
    participant RP as «repository»<br/>jogador-repository-firestore.js
    participant DB as «database»<br/>Firestore: jogadores

    U->>T: clica em "Excluir conta"
    T->>S: onExcluir()
    S->>T: abrirDialogoConfirmacao()
    T-->>U: "Esta ação não pode ser desfeita. Digite sua senha para confirmar."
    U->>T: informa a senha e confirma
    T->>S: onConfirmarExclusao(senha)
    S->>R: fetch DELETE /api/jogadores/:id {senha}
    R->>C: excluir(req, res)
    C->>SV: excluirJogador(id, senha)
    SV->>RP: buscarPorId(id)
    RP->>DB: doc("jogadores/" + id).get()
    DB-->>RP: documento
    RP-->>SV: jogador
    SV->>H: verificarSenha(senha, jogador.senha_hash)
    H-->>SV: true
    SV->>RP: atualizar(id, {data_exclusao: agora})
    RP->>DB: doc("jogadores/" + id).update({data_exclusao})
    DB-->>RP: ok
    RP-->>SV: ok
    SV-->>C: ok
    C-->>R: res.status(204).send()
    R-->>S: 204 No Content
    S->>T: encerrarSessao() e exibirMensagem("Conta excluída.")
    T-->>U: apresenta T01 Entrar
```

<a id="07-seq-criar-partida"></a>

## Sequência: RF012 Criar Partida (CRUD 3 tabelas, C)

PNG: [imagens/07-seq-criar-partida.png](imagens/07-seq-criar-partida.png)

```mermaid
---
title: "RF012 - Criar Partida (CRUD de 3 tabelas: partida, dupla, jogador - Create)"
---
sequenceDiagram
    autonumber
    actor U as Jogador
    participant T as «view»<br/>T12 Nova partida<br/>partidas.html
    participant S as «script»<br/>partidas.js
    participant R as «route»<br/>partida-routes.js
    participant C as «controller»<br/>partida-controller.js
    participant SV as «service»<br/>partida-service.js
    participant M as «model»<br/>partida.js
    participant RJ as «repository»<br/>jogador-repository-firestore.js
    participant RD as «repository»<br/>dupla-repository-firestore.js
    participant RP as «repository»<br/>partida-repository-firestore.js
    participant RC as «repository»<br/>convite-partida-repository-firestore.js
    participant DB as «database»<br/>Firestore

    U->>T: escolhe tipo 2x2, sua dupla, dupla adversária, data e horário
    U->>T: clica em "Criar e enviar convites"
    T->>S: onCriar(formulario)
    S->>S: validarFormulario(dados)
    S->>R: fetch POST /api/partidas {tipo, idDuplaA, idDuplaB, dataHoraAgendada}
    R->>C: criar(req, res)
    C->>SV: cadastrarPartida(idJogadorLogado, dados)
    SV->>RJ: buscarPorId(idJogadorLogado)
    RJ->>DB: doc("jogadores/" + id).get()
    DB-->>RJ: criador
    RJ-->>SV: criador
    SV->>RD: buscarPorId(idDuplaA)
    RD->>DB: doc("duplas/" + idDuplaA).get()
    DB-->>RD: dupla do criador (ATIVA)
    RD-->>SV: duplaA
    SV->>RD: buscarPorId(idDuplaB)
    RD->>DB: doc("duplas/" + idDuplaB).get()
    DB-->>RD: dupla adversária
    RD-->>SV: duplaB
    SV->>SV: aplicarRegras(RF012.1 a RF012.5)
    SV->>M: criarPartida({tipo, criador, duplaA, duplaB, dataHoraAgendada})
    M-->>SV: partida (AGENDADA, 0 x 0, limite 12)
    SV->>RP: inserir(partida)
    RP->>DB: collection("partidas").add(partida)
    DB-->>RP: id_partida
    RP-->>SV: partida salva
    SV->>RC: inserirVarios(convites do parceiro e dos adversários, expira em 3 min)
    RC->>DB: batch: collection("convites_partida").add(...)
    DB-->>RC: ok
    RC-->>SV: convites
    SV-->>C: partida
    C-->>R: res.status(201).json(partida)
    R-->>S: 201 Created + JSON
    S->>T: exibirMensagem("Partida criada! Convites enviados.")
    T-->>U: apresenta T11 Partidas
```

<a id="08-seq-consultar-partida"></a>

## Sequência: RF013 Consultar Partida (CRUD 3 tabelas, R)

PNG: [imagens/08-seq-consultar-partida.png](imagens/08-seq-consultar-partida.png)

```mermaid
---
title: "RF013 - Consultar Partida (CRUD de 3 tabelas: partida, dupla, jogador - Read)"
---
sequenceDiagram
    autonumber
    actor U as Jogador
    participant T as «view»<br/>T11 Partidas<br/>partidas.html
    participant S as «script»<br/>partidas.js
    participant R as «route»<br/>partida-routes.js
    participant C as «controller»<br/>partida-controller.js
    participant SV as «service»<br/>partida-service.js
    participant M as «model»<br/>partida.js
    participant RJ as «repository»<br/>jogador-repository-firestore.js
    participant RD as «repository»<br/>dupla-repository-firestore.js
    participant RP as «repository»<br/>partida-repository-firestore.js
    participant DB as «database»<br/>Firestore

    U->>T: seleciona "Partidas" no menu
    T->>S: carregarPartidas()
    S->>R: fetch GET /api/partidas?jogador=idJogadorLogado
    R->>C: listar(req, res)
    C->>SV: buscarPartidasDoJogador(idJogadorLogado)
    SV->>RD: listarPorJogador(idJogadorLogado)
    RD->>DB: duplas where jogador1 ou jogador2 == id
    DB-->>RD: duplas do jogador
    RD-->>SV: duplas
    SV->>RP: listarPorJogadorOuDuplas(idJogadorLogado, idsDuplas)
    RP->>DB: partidas where id_jogador_a/b ou id_dupla_a/b in [...]
    DB-->>RP: partidas
    RP-->>SV: partidas
    SV->>RJ: buscarPorIds(idsJogadoresDasPartidas)
    RJ->>DB: jogadores where id in [...]
    DB-->>RJ: jogadores
    RJ-->>SV: jogadores
    SV->>M: montarConfronto(partida, duplas, jogadores)
    M-->>SV: partidas com confronto, placar e status
    SV-->>C: partidas
    C-->>R: res.status(200).json(partidas)
    R-->>S: 200 OK + JSON
    S->>T: renderizarAbas(partidas por status)
    T-->>U: apresenta abas Em andamento, Agendadas e Histórico
    U->>T: clica em uma partida do histórico
    T->>S: onSelecionar(idPartida)
    S->>R: fetch GET /api/partidas/:id
    R->>C: consultar(req, res)
    C->>SV: consultarPartida(id)
    SV->>RP: buscarPorId(id)
    RP->>DB: doc("partidas/" + id).get()
    DB-->>RP: partida
    RP-->>SV: partida
    SV->>M: montarConfronto(partida, duplas, jogadores)
    M-->>SV: partida detalhada
    SV-->>C: partida
    C-->>R: res.status(200).json(partida)
    R-->>S: 200 OK + JSON
    S->>T: renderizarResultado(partida)
    T-->>U: apresenta T14 Resultado (placar, vencedor e duração)
```

<a id="09-seq-alterar-partida"></a>

## Sequência: RF014 Alterar Partida (CRUD 3 tabelas, U)

PNG: [imagens/09-seq-alterar-partida.png](imagens/09-seq-alterar-partida.png)

```mermaid
---
title: "RF014 - Alterar Partida (CRUD de 3 tabelas: partida, dupla, jogador - Update)"
---
sequenceDiagram
    autonumber
    actor U as Jogador
    participant T as «view»<br/>T12 Nova partida (edição)<br/>partidas.html
    participant S as «script»<br/>partidas.js
    participant R as «route»<br/>partida-routes.js
    participant C as «controller»<br/>partida-controller.js
    participant SV as «service»<br/>partida-service.js
    participant RJ as «repository»<br/>jogador-repository-firestore.js
    participant RD as «repository»<br/>dupla-repository-firestore.js
    participant RP as «repository»<br/>partida-repository-firestore.js
    participant RC as «repository»<br/>convite-partida-repository-firestore.js
    participant DB as «database»<br/>Firestore

    U->>T: altera data, horário ou dupla adversária e clica em "Salvar alterações"
    T->>S: onSalvar(formulario)
    S->>S: validarFormulario(dados)
    S->>R: fetch PATCH /api/partidas/:id {dataHoraAgendada, idDuplaB}
    R->>C: alterar(req, res)
    C->>SV: alterarPartida(idJogadorLogado, idPartida, dados)
    SV->>RP: buscarPorId(idPartida)
    RP->>DB: doc("partidas/" + id).get()
    DB-->>RP: partida
    RP-->>SV: partida
    SV->>SV: validar criador (RF014.1) e status AGENDADA ou EM_ESPERA (RF014.2)
    SV->>RD: buscarPorId(novaIdDuplaB)
    RD->>DB: doc("duplas/" + idDuplaB).get()
    DB-->>RD: nova dupla adversária
    RD-->>SV: duplaB
    SV->>RJ: buscarPorIds(jogadores da duplaB)
    RJ->>DB: jogadores where id in [...]
    DB-->>RJ: jogadores
    RJ-->>SV: jogadores
    SV->>SV: aplicarRegras(RF012.1 a RF012.3)
    SV->>RP: atualizar(idPartida, alteracoes)
    RP->>DB: doc("partidas/" + id).update(alteracoes)
    DB-->>RP: ok
    RP-->>SV: partida atualizada
    SV->>RC: cancelarPorJogadores(idPartida, jogadoresRetirados)
    RC->>DB: update status "RECUSADO"
    SV->>RC: inserirVarios(convites dos jogadores incluídos)
    RC->>DB: batch: collection("convites_partida").add(...)
    DB-->>RC: ok
    RC-->>SV: ok
    SV-->>C: partida
    C-->>R: res.status(200).json(partida)
    R-->>S: 200 OK + JSON
    S->>T: exibirMensagem("Partida alterada com sucesso!")
    T-->>U: apresenta T11 Partidas
```

<a id="10-seq-excluir-partida"></a>

## Sequência: RF015 Excluir Partida (CRUD 3 tabelas, D)

PNG: [imagens/10-seq-excluir-partida.png](imagens/10-seq-excluir-partida.png)

```mermaid
---
title: "RF015 - Excluir Partida (CRUD de 3 tabelas: partida, dupla, jogador - Delete)"
---
sequenceDiagram
    autonumber
    actor U as Jogador
    participant T as «view»<br/>T11 Partidas<br/>partidas.html
    participant S as «script»<br/>partidas.js
    participant R as «route»<br/>partida-routes.js
    participant C as «controller»<br/>partida-controller.js
    participant SV as «service»<br/>partida-service.js
    participant RD as «repository»<br/>dupla-repository-firestore.js
    participant RP as «repository»<br/>partida-repository-firestore.js
    participant RC as «repository»<br/>convite-partida-repository-firestore.js
    participant DB as «database»<br/>Firestore

    U->>T: clica em "Excluir" na partida agendada
    T->>S: onExcluir(idPartida)
    S->>T: abrirDialogoConfirmacao("Deseja excluir a partida [confronto]?")
    U->>T: confirma a exclusão
    T->>S: onConfirmarExclusao(idPartida)
    S->>R: fetch DELETE /api/partidas/:id
    R->>C: excluir(req, res)
    C->>SV: excluirPartida(idJogadorLogado, idPartida)
    SV->>RP: buscarPorId(idPartida)
    RP->>DB: doc("partidas/" + id).get()
    DB-->>RP: partida
    RP-->>SV: partida
    SV->>RD: buscarPorIds(idDuplaA, idDuplaB)
    RD->>DB: duplas where id in [...]
    DB-->>RD: duplas
    RD-->>SV: duplas (para identificar os convidados)
    SV->>SV: validar criador e status AGENDADA ou EM_ESPERA (RF015.1)
    SV->>RC: excluirPorPartida(idPartida)
    RC->>DB: batch: delete convites_partida where id_partida == id
    DB-->>RC: ok
    RC-->>SV: ok
    SV->>RP: excluir(idPartida)
    RP->>DB: doc("partidas/" + id).delete()
    DB-->>RP: ok
    RP-->>SV: ok
    SV-->>C: ok
    C-->>R: res.status(204).send()
    R-->>S: 204 No Content
    S->>T: removerDaLista(idPartida) e exibirMensagem("Partida excluída.")
    T-->>U: apresenta T11 Partidas atualizada
```

<a id="11-implantacao"></a>

## Diagrama de Implantação

PNG: [imagens/11-implantacao.png](imagens/11-implantacao.png)

```mermaid
---
title: "TrucoHub - Diagrama de Implantação"
---
flowchart LR
    subgraph CLIENTE["«device» Dispositivo do usuário"]
        FRONTART["<b>«execution environment» Navegador web</b><br/><i>Chrome/Firefox/Edge 120+ (Windows 10+), Safari 17+ (iOS 17+)</i><br/>───────────<br/>«artifact» front-end<br/>index.html, jogadores.html, partidas.html<br/>style.css, jogadores.js, partidas.js"]
    end

    subgraph NETLIFY["«device» Servidor Netlify (nuvem)"]
        direction TB
        DIST["<b>«execution environment» Netlify CDN</b><br/>───────────<br/>«artifact» dist/<br/>páginas, css, js e assets"]
        API["<b>«execution environment» Netlify Functions (Node.js 26)</b><br/>───────────<br/>«artifact» API TrucoHub<br/>src/backend: app, routes, controllers, middlewares,<br/>services, repositories, models, utils, errors<br/>src/config/firebase.js"]
    end

    subgraph GOOGLE["«device» Servidor Google Cloud (Firebase)"]
        DB[("<b>«execution environment» Cloud Firestore</b><br/>«database» coleções:<br/>jogadores, amizades, duplas, partidas,<br/>convites_partida, lancamentos")]
    end

    GIT["<b>«device» Computador do desenvolvedor</b><br/>───────────<br/>«artifact» repositório local (Git)<br/>Node.js 26, Firebase CLI 15"]
    REPO["<b>«device» GitHub</b><br/>───────────<br/>«artifact» BrunoGTB/TrucoHub"]

    FRONTART <-->|"HTTPS (TLS 1.2+)<br/>páginas estáticas"| DIST
    FRONTART <-->|"HTTPS (TLS 1.2+)<br/>REST/JSON /api/*"| API
    API <-->|"HTTPS / gRPC<br/>Firebase SDK"| DB
    GIT -->|"git push (HTTPS)"| REPO
    REPO -->|"webhook: build e deploy<br/>(netlify.toml)"| DIST

    classDef art fill:#fff8dc,stroke:#8a6d3b,color:#222
    class FRONTART,DIST,API,GIT,REPO art
```
