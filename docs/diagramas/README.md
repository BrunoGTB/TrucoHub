# Diagramas de design do TrucoHub (Sprint 2)

Diagramas do item #19 (classes de domínio e pacotes) da Sprint 2.

## Índice

| Arquivo | Diagrama | Item |
|---|---|---|
| [01-classes-dominio](#01-classes-dominio) | Diagrama de Classes de Domínio | #19 |
| [02-pacotes](#02-pacotes) | Diagrama de Pacotes (front-end e back-end) | #19 |

## Decisões de modelagem

- **Base:** o dicionário de dados do [Documento de Requisitos](../requisitos/Documento_de_Requisitos_TrucoHub.pdf) (capítulo 5) e a estrutura de pastas do README.
- **Administrador:** `Administrador` herda de `Jogador`, porque todo administrador também é um jogador, com as mesmas informações e funcionalidades e mais as de moderação (RF024 e RF025). No banco não existe tabela separada: é a mesma coleção `jogadores`, e o campo `perfil` (`JOGADOR` ou `ADMIN`) indica qual é o caso, como no dicionário de dados.
- **Herança de partida:** `PartidaDuplas` (2×2) e `PartidaIndividual` (1×1) herdam de `Partida` (no banco, uma só coleção `partidas`, com o campo `tipo`).
- **Camadas do back-end:** `routes` → `controllers` → `services` → `repositories` → Firestore, com `models` (entidades e regras de formato) e `utils` (hash scrypt da senha). Os nomes dos arquivos seguem o padrão kebab-case do CRUD de Jogador (#24).
- **CRUD de 1 tabela:** Jogador (RF002 a RF005). A exclusão é lógica: preenche `data_exclusao`.
- **CRUD de 3 tabelas:** Partida, com Dupla e Jogador (RF012 a RF015). `convite_partida` aparece como tabela intermediária.

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
