# Regras de Verificação e Analise de Requisitos

**Projeto:** TrucoHub
**Pasta:** Padrões Adotados
**Equipe:** Bruno dos Santos Custódio e Gabriel Carvalho Batista
**Versão:** 3.0

## 1. Objetivo

Este documento estabelece os padrões que deverão ser seguidos pelos integrantes da equipe durante a elaboração, especificação, análise e verificação dos requisitos do sistema TrucoHub.

O objetivo é garantir a qualidade, a uniformidade e a consistência da documentação, facilitando a compreensão dos requisitos por todos os envolvidos no desenvolvimento do projeto.

As regras aqui estabelecidas foram extraídas do capítulo 1 («Análise de Requisitos») do livro *Engenharia de Software Aplicada – Fundamentos*, de Rogério Magela, nas seguintes partes:

| Parte do capítulo 1 | Uso neste documento | Prefixo das regras |
|---|---|---|
| Seção 7.2 – Especificação de Requisitos (guia de escrita, p. 18-19) | Regras de redação do requisito | **ESP** |
| Seção 7.3 – Análise de Requisitos (itens de qualidade, p. 19-23) | Regras de análise do conjunto de requisitos | **ANA** |
| Seção 5 – Atributos dos Requisitos (p. 11-13) | Campos e valores permitidos de cada requisito | **NOM** |
| Seção 3 – Requisitos Não Funcionais (p. 6-9) | Categorias de requisito não funcional | **NOM** |
| Seção 7.5 – Gerência de Requisitos (p. 24-25) | Controle de mudanças | **MUD** |

**Princípio de objetividade:** nenhuma regra depende de opinião. Cada regra é acompanhada de uma verificação feita por contagem, por presença ou ausência de palavras de uma lista fechada, ou por comparação de campos. Dois revisores diferentes devem chegar ao mesmo resultado.

**Parâmetros definidos pela equipe:** quando o livro orienta uma regra sem fixar um número (por exemplo, «evite frases grandes»), a equipe fixa o valor abaixo. Esses valores só mudam pelo procedimento da seção 7.

| Parâmetro | Valor |
|---|---|
| P1 – máximo de palavras da descrição de um requisito | 15 |
| P2 – máximo de níveis hierárquicos de um requisito | 3 |
| P3 – máximo de passos do procedimento de verificação | 5 |
| P4 – máximo de requisitos que usam conectores lógicos (ANA03), em relação ao total | 5% (arredondado para cima) |

## 2. Padrão de nomenclatura

Os requisitos deverão ser identificados por meio de siglas e numeração sequencial, conforme as categorias definidas no livro (p. 3):

- **RF (Requisito Funcional):** define O QUE o software deverá fornecer e seu comportamento durante a interação com o ambiente externo.
- **RNF (Requisito Não Funcional):** restringe a forma como os requisitos funcionais fornecerão seus serviços e se comportarão durante a execução.

A numeração deverá ser única e sequencial dentro de cada categoria, não podendo ser reutilizada para requisitos diferentes. Conforme o livro (seção 7.3.9, p. 22), a identificação é única e hierárquica: um requisito detalhado em outros recebe os identificadores dos filhos acrescidos do número do pai.

| ID | Regra | Como verificar | Passa quando |
|---|---|---|---|
| NOM01 | O identificador segue o formato `RFnn`, `RNFnn`, com filhos `RFnn.n` e `RFnn.n.n`. Expressão: `^(RF\|RNF)[0-9]{2}(\.[0-9]+){0,2}$` | Aplicar a expressão ao ID | O ID casa com a expressão |
| NOM02 | Numeração sequencial por categoria, sem lacunas, e **sem reaproveitamento**: requisito vetado mantém o ID | Listar os IDs de cada categoria | Sequência sem salto e sem repetição |
| NOM03 | O ID de um filho é o ID do pai, um ponto e o número sequencial do filho (RF03.1 é filho de RF03) | Comparar o ID do filho com o campo Pai | O prefixo do filho é igual ao ID do pai |
| NOM04 | Todo requisito tem os campos obrigatórios da seção 3 e os valores dos campos de lista pertencem às listas da seção 3 | Conferir campo a campo | Nenhum campo vazio e nenhum valor fora da lista |
| NOM05 | Todo RNF tem a categoria escolhida entre as 15 categorias do livro (seções 3.1 a 3.15) | Conferir o campo Categoria | O valor pertence à lista |

Exemplos:

- RF01 – O software DEVE permitir o cadastro de jogadores.
- RF02 – O software DEVE permitir o cadastro de duplas.
- RF03 – O software DEVE permitir o registro de partidas.
- RF03.1 – O software DEVE exigir uma mesa para cada partida.
- RF03.2 – O software DEVE exigir duas duplas diferentes para cada partida.
- RNF01 – O software DEVE listar partidas em no máximo 2 segundos.
- RNF02 – O software DEVE exigir senha com no mínimo 8 caracteres.

## 3. Atributos obrigatórios de cada requisito

O livro afirma que os requisitos possuem atributos porque não são fixos no tempo (seção 5, p. 11). Todo requisito do TrucoHub tem os campos abaixo.

| Campo | Valores permitidos | Local no livro |
|---|---|---|
| ID | Conforme NOM01 | seção 7.3.9, p. 22 |
| Descrição | Conforme as regras ESP | seção 7.2, p. 18-19 |
| Grupo | Autenticação, Jogadores, Duplas, Mesas, Partidas, Pontuação, Resultados, Dashboard | seção 7.2.7 e 7.3.11, p. 19 e 22 |
| Pai | ID de um RF existente, ou `—` quando o requisito é macro | seção 7.2.5, p. 19 |
| Restringe | Somente RNF: ID de um ou mais RF | seção 7.2.9, p. 19 |
| Categoria | Somente RNF: Corretude, Confiabilidade, Robustez, Desempenho, Facilidade de Uso, Verificabilidade, Facilidade de Manutenção, Reutilização, Portabilidade, Compreensibilidade, Interoperabilidade, Produtividade, Desvio de Planejamento, Visibilidade, Segurança | seção 3.1 a 3.15, p. 7-9 |
| Benefício | Crítico, Importante, Útil | seção 5.1, p. 11 |
| Situação | Proposto, Incorporado, Aprovado, Vetado | seção 5.2, p. 11-12 |
| Fonte | Formato `Solicitante; referência`, ambos preenchidos | seção 5.3, p. 12 |
| Esforço | Alto, Médio, Baixo | seção 5.4, p. 12 |
| Risco | Alto, Médio, Baixo | seção 5.5, p. 12 |
| Estabilidade | Alto, Médio, Baixo | seção 5.6, p. 12 |
| Versão | `V1`, `V2`, ... (versão em que o requisito aparece pela primeira vez) | seção 5.7, p. 12-13 |
| Coordenador | Bruno ou Gabriel | seção 5.8, p. 13 |
| Verificação | Até P3 passos numerados e resultado esperado (ANA04) | seção 7.3.4, p. 21 |
| Apoio técnico | Opcional: referências a documentos, links ou vídeos | seção 5.9, p. 13 |

Somente requisitos com Situação `Aprovado` e Versão de destino escolhida são implementados (p. 12).

## 4. Regras de especificação (seção 7.2 do livro)

| ID | Regra | Fundamento | Como verificar | Passa quando |
|---|---|---|---|---|
| ESP01 | **Convenção de escrita.** A descrição começa com «O software DEVE» ou «O software não DEVE» | 7.2, p. 18 | Ler as três primeiras palavras (quatro, no caso de «não DEVE») | Começa com uma das duas formas |
| ESP02 | **Um requisito por vez.** A descrição tem exatamente 1 ocorrência de «DEVE» | 7.2.1, p. 18 | Contar «DEVE» | Contagem = 1 |
| ESP03 | **Palavras proibidas.** A descrição não contém nenhuma palavra das listas A1 e A2 (Apêndice A), sem distinguir maiúsculas de minúsculas | 7.2.2, p. 18 | Busca textual de cada termo | Zero ocorrências |
| ESP04 | **Frases curtas.** A descrição tem no máximo P1 palavras, uma única sentença (um só ponto final, no fim) e nenhum pronome possessivo (meu, minha, nosso, nossa, nossos, nossas, seu, sua, seus, suas) | 7.2.3, p. 18 | Contar palavras, pontos finais e possessivos | palavras ≤ 15, pontos finais = 1, possessivos = 0 |
| ESP05 | **Vocabulário fechado.** Todo substantivo da descrição consta no glossário (A3) e todo verbo consta na lista de verbos (A4), exceto o «DEVE» da convenção de ESP01. Artigos, preposições, numerais, unidades e as demais palavras de apoio (A5) são livres | 7.2.4, p. 18 | Comparar cada palavra com as listas A3, A4 e A5 | Nenhuma palavra fora das listas |
| ESP06 | **Estrutura hierárquica.** Todo requisito com ponto no ID tem Pai existente, o ID do filho segue NOM03 e a profundidade é no máximo P2 níveis | 7.2.5, p. 19 | Buscar o pai de cada filho e contar os níveis | Pai existe, NOM03 vale e níveis ≤ 3 |
| ESP07 | **Atributos atualizados a cada novo requisito.** Toda criação ou alteração de requisito gera uma linha no histórico (data `AAAA-MM-DD`, solicitante, motivo, versão) e atualiza os atributos da seção 3, inclusive a data da mudança de Situação | 7.2.6, p. 19; 5.2, p. 11; 7.5.3, p. 25 | Comparar a alteração com o histórico | Linha de histórico com os 4 campos para cada alteração |
| ESP08 | **Agrupamento.** Todo requisito tem Grupo de lista fechada e a lista de requisitos é apresentada agrupada por Grupo | 7.2.7, p. 19 | Conferir o campo e a ordem do documento | Grupo preenchido e documento ordenado por Grupo |
| ESP09 | **Do requisito do usuário ao do software.** Todo RF macro (Pai = `—`) corresponde a exatamente 1 caso de uso (`UCnn`) e todo caso de uso corresponde a exatamente 1 RF macro | 7.2.8, p. 19; seção 4, p. 9-10 (regras BR1 e BR3 do livro) | Cruzar a lista de casos de uso com os RF macro | Relação 1 para 1 |
| ESP10 | **RNF para cada macro.** Todo RF macro é restringido por ao menos 1 RNF e, entre esses, por ao menos 1 de categoria Corretude ou Confiabilidade. RNF de Corretude informa o índice `alto`, `médio` ou `baixo` | 7.2.9, p. 19; 3.1 e 3.2, p. 7 | Procurar RNF com Restringe = RF macro | Ao menos 1 RNF, sendo 1 de Corretude ou Confiabilidade |

## 5. Regras de análise (seção 7.3 do livro)

A análise garante a consistência e a qualidade dos requisitos especificados (p. 19). Conforme o livro, ela deve ser feita por outro analista e não por quem especificou os requisitos.

| ID | Item de qualidade | Fundamento | Como verificar | Passa quando |
|---|---|---|---|---|
| ANA01 | **Correta:** o requisito satisfaz uma necessidade real do usuário (a área C do diagrama de Venn do livro deve ser nula) | 7.3.1, p. 20 | Conferir o campo Fonte; para requisito de iniciativa da própria equipe (Fonte cita só Bruno ou Gabriel), conferir se há aprovação registrada do aprovador oficial | Todo requisito `Aprovado` tem Fonte válida e nenhum requisito de iniciativa da equipe está `Aprovado` sem aprovação registrada |
| ANA02 | **Completa:** nenhuma necessidade fica sem requisito (a área A deve estar contida em C) | 7.3.2, p. 20 | Montar a matriz Necessidade x Requisito com a lista de necessidades (Apêndice B) | Toda necessidade tem ao menos 1 RF associado |
| ANA03 | **Sem ambiguidade:** vale ESP02 e ESP03. Conectores lógicos «E» e «OU» só são admitidos se cada operando estiver entre colchetes e o conector em maiúsculas, e no máximo P4 do total de requisitos pode usá-los | 7.3.3, p. 20-21 | Aplicar ESP02 e ESP03; contar requisitos com conectores | Zero violações e contagem de requisitos com conectores ≤ 5% do total |
| ANA04 | **Verificável:** existe um processo finito para verificar o requisito. A Verificação lista no máximo P3 passos numerados e um resultado esperado com valor observável. Todo RNF contém um número seguido de unidade **ou** o nome de um padrão ou produto externo específico. Adjetivos e advérbios das listas A1 e A2 não aparecem | 7.3.4, p. 21 | Contar passos; localizar número com unidade ou nome do padrão no RNF; busca textual | Passos ≤ 5, resultado esperado preenchido, RNF quantificado ou com padrão nomeado |
| ANA05 | **Consistente:** (a) cada conceito tem um único termo no glossário e os sinônimos remetidos (coluna do glossário) não aparecem nos requisitos; (b) pares de requisitos de um mesmo Grupo com o mesmo substantivo do glossário e polaridades opostas («DEVE» e «não DEVE») são listados e resolvidos por registro; (c) nenhum ID e nenhuma descrição se repetem | 7.3.5, p. 21 | Busca textual dos sinônimos; filtrar pares por Grupo e substantivo; comparar IDs e textos | Zero sinônimos usados, zero pares sem registro de resolução, zero repetições |
| ANA06 | **Compreensível:** a especificação serve ao usuário e ao desenvolvedor, sem notação formal. A descrição não contém símbolos formais (∀ ∃ ⇒ → ∧ ∨ ¬) nem termos da lista técnica A6, e todo termo do domínio está no glossário (ESP05) | 7.3.6, p. 21 | Busca textual dos símbolos e dos termos da lista A6 | Zero ocorrências |
| ANA07 | **Modificável:** requisitos pequenos e concisos, com mudanças registradas sem renumeração. Vale ESP04 e todo requisito alterado mantém o ID | 7.3.7, p. 21-22 | Aplicar ESP04; comparar IDs entre versões do documento | palavras ≤ 15 e IDs preservados entre versões |
| ANA08 | **Rastreável para trás:** a origem de cada requisito está documentada no campo Fonte | 7.3.8, p. 22 | Conferir o formato `Solicitante; referência` | Os dois elementos preenchidos |
| ANA09 | **Rastreável para frente:** a Matriz de Rastreabilidade (RTM) liga cada requisito ao caso de uso, ao elemento de modelo e, conforme a fase, ao código-fonte e ao teste. Os IDs são únicos e hierárquicos (NOM01) | 7.3.9, p. 22 | Conferir as colunas da RTM de acordo com a fase em curso (fase de análise: caso de uso; projeto: elemento de modelo; implementação: arquivo; testes: `Tnn`) | Nenhuma célula vazia das colunas exigidas pela fase |
| ANA10 | **Independência de projeto:** o requisito não impõe estrutura de projeto. A descrição não contém termos da lista A7 (estrutura interna) nem nomes de tecnologia da lista A8 | 7.3.10, p. 22 | Busca textual dos termos | Zero ocorrências |
| ANA11 | **Organizada:** o documento não é uma lista de frases; é organizado por Grupo (organização pelo problema) e por hierarquia (detalhamento). Todo Grupo tem ao menos 1 requisito | 7.3.11, p. 22-23 | Conferir a ordenação por Grupo e depois por ID e a existência de requisitos em cada Grupo | Documento ordenado e nenhum Grupo vazio |

## 6. Procedimentos de verificação e análise

Antes de um requisito ser considerado aprovado para implementação, deverá passar por uma revisão feita **por integrante diferente do autor** (seção 7.3, p. 19). Cada item abaixo corresponde a regras desta seção:

| # | O requisito... | Regras verificadas |
|---|---|---|
| 1 | Possui identificação e campos conforme o padrão de nomenclatura | NOM01 a NOM05, ESP06, ESP08 |
| 2 | Representa uma necessidade real do projeto | ANA01, ANA08 |
| 3 | Apresenta informações suficientes e cobre as necessidades levantadas | ANA02, ESP09, ESP10 |
| 4 | Não permite interpretações diferentes | ESP01 a ESP04, ANA03 |
| 5 | Pode ser verificado por meio de testes ou inspeções | ANA04 |
| 6 | Não apresenta contradições com outros requisitos | ANA05 |
| 7 | Utiliza os termos padronizados na documentação | ESP05, ANA05, ANA06 |
| 8 | Possui origem identificável e relação com as funcionalidades do sistema | ANA08, ANA09 |
| 9 | É independente de projeto, conciso e organizado | ANA07, ANA10, ANA11 |

**Resultado:** um requisito só é aprovado se passar em 100% das regras aplicáveis. Em caso de falha, registra-se o ID da regra violada e o requisito é revisado antes de nova tentativa.

**Registro:** cada verificação é salva em `Padrões Adotados/registros/verificacao-AAAA-MM-DD.md` com a tabela:

| Requisito | NOM | ESP01-05 | ESP06-10 | ANA01-04 | ANA05-08 | ANA09-11 | Revisor | Resultado |
|---|---|---|---|---|---|---|---|---|
| RF01 | | | | | | | | |

## 7. Controle de mudanças

Baseado na seção 7.5 do livro (p. 24-25), a política de mudança do TrucoHub é:

| ID | Regra | Como verificar |
|---|---|---|
| MUD01 | Toda proposta de mudança em requisito é aberta como Issue com o rótulo `requisito` e os campos: ID do requisito, motivo, solicitante, requisitos impactados (obtidos da RTM) e versão de destino | Issue com os 5 campos preenchidos |
| MUD02 | A mudança só é feita no documento após a Issue estar `Aprovado`; o commit usa a mensagem `docs(requisitos): <ID> <motivo>` e referencia a Issue | Histórico do Git com a mensagem no padrão |
| MUD03 | Requisito macro que gere novo caso de uso só passa a `Aprovado` com aprovação registrada do aprovador oficial do projeto (a confirmar com o professor) | Registro de aprovação anexado à Issue |
| MUD04 | Alterações neste documento (listas, parâmetros P1 a P4, glossário) seguem o mesmo fluxo, com commit `docs(padroes): <motivo>` e aumento da versão do documento | Histórico do Git e versão alterada |

## 8. Aplicação das regras

Todos os integrantes da equipe deverão seguir os padrões estabelecidos neste documento durante a elaboração, revisão e atualização da especificação de requisitos do TrucoHub.

As regras deverão ser aplicadas de maneira uniforme, independentemente do integrante responsável pela elaboração do requisito.

Qualquer alteração nos padrões deverá ser discutida entre os integrantes e registrada na documentação do projeto, conforme MUD04.

## 9. Referência bibliográfica

MAGELA, Rogério. *Engenharia de Software Aplicada – Fundamentos*. Rio de Janeiro: Alta Books, 2006. Capítulo 1: Análise de Requisitos, seções 3, 5, 7.2, 7.3 e 7.5.

### 9.1 Correspondência entre regras e o livro

| Regras | Seção do livro | Páginas |
|---|---|---|
| ESP01 | 7.2 (convenção «O software DEVE...») | 18 |
| ESP02 | 7.2.1 Defina somente um requisito por vez | 18 |
| ESP03 | 7.2.2 Evite as palavras | 18 |
| ESP04 | 7.2.3 Evite frases grandes | 18 |
| ESP05 | 7.2.4 Utilize um vocabulário fechado | 18 |
| ESP06 | 7.2.5 Mantenha uma estrutura hierárquica dos requisitos | 19 |
| ESP07 | 7.2.6 Para cada novo requisito, atualize seus atributos | 19 |
| ESP08 | 7.2.7 Agrupe corretamente os requisitos | 19 |
| ESP09 | 7.2.8 Transforme os requisitos do usuário em requisitos do software | 19 |
| ESP10 | 7.2.9 Defina os requisitos não funcionais para cada requisito macro ou caso de uso | 19 |
| ANA01 | 7.3.1 Especificação: Correta | 20 |
| ANA02 | 7.3.2 Especificação: Completa | 20 |
| ANA03 | 7.3.3 Especificação: Sem Ambigüidade | 20-21 |
| ANA04 | 7.3.4 Especificação: Verificável | 21 |
| ANA05 | 7.3.5 Especificação: Consistente | 21 |
| ANA06 | 7.3.6 Especificação: Compreensível | 21 |
| ANA07 | 7.3.7 Especificação: Modificável | 21-22 |
| ANA08 | 7.3.8 Especificação: Rastreável (para trás) | 22 |
| ANA09 | 7.3.9 Especificação: Rastreável (para frente) | 22 |
| ANA10 | 7.3.10 Especificação: Independência de Projeto | 22 |
| ANA11 | 7.3.11 Especificação: Organizada | 22-23 |
| NOM01 a NOM03 | 7.3.9 (identificação única e hierárquica); definições de RF e RNF | 22; 3 |
| NOM04 | 5 Atributos dos Requisitos (5.1 a 5.9) | 11-13 |
| NOM05 | 3 Requisitos Não Funcionais (3.1 a 3.15) | 7-9 |
| MUD01 a MUD04 | 7.5.3 Gerencie as versões; 7.5.5 Tenha uma política de mudança; 7.4.1 formulário de alteração | 25; 25; 23 |

Os parâmetros P1 a P4 e as listas complementares A2, A6, A7 e A8 são definições da equipe, adotadas para tornar objetivas as orientações do livro, que não fixam números nem enumeram todos os termos.

---

## Apêndice A – Listas fechadas

### A1. Palavras proibidas do livro (seção 7.2.2, p. 18)

E, OU, SOMENTE SE, EXCETO, SE NECESSÁRIO, MAS, CONTUDO, ENTRETANTO, USUALMENTE, GERALMENTE, FREQUENTEMENTE (grafado «freqüentemente» no livro), TIPICAMENTE, AMIGÁVEL, VERSÁTIL, FLEXÍVEL, APROXIMADAMENTE, TÃO LOGO QUANTO POSSÍVEL, TALVEZ, PROVAVELMENTE.

### A2. Palavras de mesma ideia (complemento da equipe, autorizado pelo «ou palavras que forneçam a mesma ideia» do livro)

e/ou, bem como, além disso, também, assim como, porém, todavia, normalmente, eventualmente, quando necessário, caso necessário, se possível, a critério, rápido, rapidamente, fácil, simples, intuitivo, eficiente, robusto, moderno, adequado, apropriado, bom, melhor, algum, alguns, vários, muitos, poucos, diversos, cerca de, em torno de, etc., entre outros, por exemplo, mais, menos.

### A3. Glossário (vocabulário fechado de substantivos)

| Termo | Definição | Sinônimos remetidos (não usar nos requisitos) |
|---|---|---|
| Software | O sistema web TrucoHub | sistema, aplicação, sistema web, TrucoHub |
| Organizador | Pessoa autenticada que opera o software | usuário, administrador, operador, mesário |
| Jogador | Pessoa que joga truco e é cadastrada no software | competidor, atleta, participante |
| Dupla | Formação fixa de dois jogadores | time, equipe, par, parceria |
| Mesa | Local físico onde ocorre uma partida | campo, arena |
| Partida | Disputa entre duas duplas em uma mesa, até o limite de pontos | jogo, rodada, confronto |
| Pontos | Valor acumulado por uma dupla em uma partida | pontuação |
| Placar | Par de pontos das duas duplas de uma partida | marcador, score |
| Status | Estado de uma mesa ou de uma partida | — |
| Vitória | Partida finalizada em que a dupla atingiu o limite de pontos | — |
| Derrota | Partida finalizada em que a dupla não atingiu o limite de pontos | — |
| Desempenho | Conjunto de vitórias, derrotas e aproveitamento de um jogador ou de uma dupla | estatística |
| Ranking | Lista ordenada de jogadores ou de duplas por desempenho | classificação |
| Dashboard | Tela que exibe rankings e totais gerais | painel |
| Cadastro | Inclusão de uma entidade (jogador, dupla, mesa) no software | — |
| Registro | Inclusão de uma partida ou de pontos no software | — |
| Consulta | Exibição de dados já registrados | busca |
| Alteração | Mudança de dados já registrados | edição |
| Exclusão | Remoção de dados registrados | remoção |
| Senha | Segredo de acesso do organizador | — |
| Navegador | Programa do organizador para acessar o software | browser |
| Limite de pontos | Quantidade de pontos que finaliza a partida (12) | — |

O termo «Situação» é reservado ao atributo do requisito (seção 3); para mesa e partida usa-se «Status».

### A4. Lista de verbos permitidos

permitir, exigir, impedir, rejeitar, bloquear, exibir, listar, informar, registrar, cadastrar, consultar, alterar, excluir, cancelar, iniciar, finalizar, somar, calcular, atualizar, validar, ordenar, autenticar, armazenar, responder, funcionar, ultrapassar (nas formas flexionadas necessárias).

### A5. Palavras de apoio livres

- Artigos: o, a, os, as, um, uma, uns, umas.
- Preposições e contrações: de, do, da, dos, das, em, no, na, nos, nas, para, por, com, sem, até, após, antes, durante, ao, à, entre, sobre.
- Outras: não, que, cada, todo, toda, todos, todas, mesmo, mesma, mesmos, mesmas, diferente, diferentes.
- Numerais (em algarismos ou por extenso) e unidades: segundo(s), minuto(s), caractere(s), ponto(s), partida(s), registro(s).
- «máximo» e «mínimo» somente acompanhados de número na mesma sentença.
- Nomes de produtos externos usados como padrão ou ambiente, somente em RNF (ex.: Google Chrome, Mozilla Firefox, Microsoft Edge).

### A6. Termos técnicos proibidos nos requisitos (ANA06)

tabela, banco de dados, classe, objeto, método, função, chave estrangeira, índice, consulta SQL, API, requisição, servidor, framework.

### A7. Termos de estrutura de projeto proibidos (ANA10)

módulo, componente, subsistema, camada, arquitetura, controlador, MVC, repositório, microsserviço.

### A8. Nomes de tecnologia de implementação proibidos (ANA10)

PHP, MySQL, MariaDB, PostgreSQL, SQL, HTML, CSS, JavaScript, Bootstrap, PDO, PHPUnit, Selenium, GitHub, Docker, Python, Flask, Laravel.

## Apêndice B – Lista de necessidades (ANA02)

Extraída do enunciado do projeto; cada necessidade deve ter ao menos 1 RF associado.

| ID | Necessidade |
|---|---|
| N01 | Autenticar o organizador no software |
| N02 | Cadastrar e gerenciar jogadores |
| N03 | Cadastrar e gerenciar duplas |
| N04 | Organizar e gerenciar mesas |
| N05 | Gerenciar partidas |
| N06 | Contar e atualizar pontos durante a partida |
| N07 | Registrar vitórias e derrotas |
| N08 | Acompanhar o desempenho individual dos jogadores |
| N09 | Acompanhar o desempenho coletivo das duplas |
| N10 | Exibir rankings e estatísticas em um dashboard |

## Apêndice C – Exemplos de verificação

**Aprovado**

> RF03.1 – O software DEVE exigir uma mesa para cada partida.

ESP01 a ESP05 ok (9 palavras, 1 «DEVE», nenhuma palavra proibida, todos os substantivos no glossário). Pai: RF03; Fonte: `Professor; Enunciado seção 3`.

> RNF01 – O software DEVE listar partidas em no máximo 2 segundos.

ANA04 ok: número seguido de unidade. Categoria: Desempenho (p. 8).

**Reprovado**

> RF3 – O software deverá ser rápido e fácil e permitir cadastrar partidas, mesas, etc.

| Regra violada | Motivo |
|---|---|
| NOM01 | ID `RF3` sem dois dígitos |
| ESP01 e ESP02 | Não começa com «O software DEVE»; zero ocorrências de «DEVE» |
| ESP03 | Contém «e», «rápido», «fácil», «etc.» |
| ESP05 | «rápido» e «fácil» fora das listas |
| ANA04 | Adjetivos sem quantificação objetiva |

> RF04 – O software DEVE permitir o registro de nossos patrocinadores.

Violações: ESP04 (possessivo «nossos») e ESP05 («patrocinadores» não consta no glossário).