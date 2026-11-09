# Verificação de requisitos: 2026-11-08

**Projeto:** TrucoHub
**Documento verificado:** Documento de Requisitos TrucoHub, versão 3.0 (novembro/2026)
**Padrão aplicado:** Regras de Verificação e Analise de Requisitos, versão 3.0
**Escopo:** 25 RF macro e 73 regras de negócio derivadas (98 requisitos funcionais), mais os 16 requisitos não funcionais NF001 a NF016
**Revisor:** pré-análise automatizada. Pela seção 6 das Regras, a revisão final precisa ser feita por um integrante diferente do autor do documento: preencher a coluna Revisor com o nome de quem conferir.

## 1. Resultado geral

| Item | Resultado |
|---|---|
| Requisitos funcionais verificados | 98 (25 macro + 73 derivados) |
| Aprovados em 100% das regras | **0** |
| Reprovados | **98** |
| Requisitos não funcionais verificados | 16 |
| RNF aprovados | **0** |

Nenhum requisito foi aprovado, mas a maior parte das falhas não está na redação dos requisitos. Ela vem de **cinco falhas globais**, que atingem todos os requisitos ao mesmo tempo, e de um descompasso entre as duas versões 3.0: o documento de requisitos evoluiu (amizades, convites, Admin, partida em espera, sem mesas) e as Regras continuaram descrevendo o escopo antigo (organizador, mesas).

A redação em si está boa: os 98 requisitos funcionais passam em ESP01 (começam com «O software DEVE»), ESP02 (um único «DEVE»), ESP04 (no máximo 15 palavras, uma sentença, sem possessivos), ESP06 (hierarquia), ANA06 (sem termos técnicos) e ANA10 (sem tecnologia ou estrutura de projeto).

## 2. Falhas globais (atingem todos os requisitos)

| # | Regra | Constatação | Correção sugerida |
|---|---|---|---|
| G1 | NOM01 | Os IDs usam três dígitos (`RF001`, `RF001.1`) e os RNF usam `NF001`. A expressão da regra exige `RFnn` / `RNFnn`. O próprio documento de requisitos diz que «RNF é utilizado para identificar Requisitos Não Funcionais», mas usa `NF`. | Trocar `NF` por `RNF` no documento. Para os três dígitos, alterar a regra NOM01 para `[0-9]{3}` pelo procedimento MUD04 (mais simples que renumerar 98 requisitos e 114 issues). |
| G2 | NOM04 / ANA01 / ANA08 / ANA04 | Os requisitos têm só Prioridade. Faltam os atributos obrigatórios da seção 3: Benefício, Situação, Fonte, Esforço, Risco, Estabilidade, Versão, Coordenador e **Verificação** (até 5 passos e resultado esperado). Sem Fonte, ANA01 e ANA08 falham; sem Verificação, ANA04 falha. «Essencial/Importante/Desejável» também não pertence à lista de Benefício (Crítico/Importante/Útil). | Acrescentar a cada RF macro uma tabela de atributos com esses campos. As regras de negócio podem herdar os atributos do pai, se a Regra for ajustada para dizer isso. |
| G3 | ESP07 | O documento não tem histórico de alterações (data, solicitante, motivo, versão). | Incluir a tabela de histórico no início do documento. |
| G4 | ESP08 / ANA11 | Os grupos usados (Conta do Jogador, Amizade, Dupla, Partida, Competitivo, Administração) não pertencem à lista fechada da seção 3 (Autenticação, Jogadores, Duplas, Mesas, Partidas, Pontuação, Resultados, Dashboard). O grupo «Mesas» da lista fica sem nenhum requisito. | Atualizar a lista de grupos das Regras para os grupos do documento (MUD04). O documento já está bem organizado por grupo e por hierarquia. |
| G5 | ANA02 | A necessidade N04 (organizar e gerenciar mesas) não tem RF. O documento exclui mesas do escopo («Não fazem parte desta versão: cadastro de mesas»). As necessidades N01 a N03 e N05 a N10 estão cobertas. | Retirar N04 do Apêndice B das Regras (ou registrar a exclusão como decisão aprovada) e incluir as necessidades novas (amizade, convites, administração). |

## 3. Falhas específicas de redação

| Requisito | Regra | Problema | Redação sugerida |
|---|---|---|---|
| RF022 | ESP03, ANA03 | Usa o conector «e» sem colchetes («ranking de jogadores e de duplas»). As regras derivadas RF022.1 e RF022.2 já separam os dois rankings. | «O software DEVE exibir rankings.» |
| RF003.1, RF003.3, RF003.4 | ANA05 | Usam «busca», sinônimo remetido de «Consulta» no glossário A3. | Trocar «busca» por «consulta». Ex.: «O software DEVE permitir a consulta de jogadores pelo nome.» |
| RF015.3 | ANA05 | Usa «participantes», sinônimo remetido de «Jogador». | «O software DEVE informar os jogadores sobre a exclusão da partida.» (troca também «avisar», que não está em A4) |
| 73 requisitos | ESP05 | Palavras fora do vocabulário fechado (lista completa na seção 5). Quase todas são termos que o documento de requisitos define no próprio glossário (amizade, convite, criador, admin, banido, sessão, e-mail, apelido, perfil) ou verbos que faltam em A4 (enviar, retirar, avisar, filtrar, banir, reativar, aceitar, recusar). | Atualizar o glossário A3 com os termos do glossário do documento de requisitos, e a lista A4 com os verbos realmente usados (MUD04). Depois disso, rever os poucos casos restantes, como «quem», «qualquer» e «duas». |

## 3.1 Requisitos não funcionais

| Regra | Constatação |
|---|---|
| NOM01 | Os 16 usam `NF` em vez de `RNF`. |
| NOM05 | As categorias Usabilidade, Distribuição, Padrões e Hardware e software não estão entre as 15 categorias do livro. Usabilidade corresponde a «Facilidade de Uso»; as demais precisam ser reclassificadas (por exemplo, NF012 em Portabilidade e NF015/NF016 em Portabilidade ou Interoperabilidade). |
| ESP01 | Os 16 escrevem «O software deve», com «deve» minúsculo. |
| ESP04 / ANA07 | 14 dos 16 passam de 15 palavras (só NF010 e NF014 cabem no limite). |
| ESP03 / ANA03 | NF002, NF004, NF007, NF009, NF012, NF015 e NF016 usam «e» ou «ou» sem colchetes. |
| ANA04 | 15 dos 16 são quantificados ou citam um padrão nomeado. NF004 (preservação do placar) não tem número com unidade nem padrão: sugerir um critério observável, como «após recarregar a página, o placar exibido é igual ao último registrado». |
| ANA05 | NF006 usa «participantes» e NF010 usa «usuário», sinônimos remetidos no glossário. |
| ESP10 | **Passa:** todo RF macro é restringido por NF003 (Confiabilidade, «Todos os requisitos funcionais»). |

Observação: o professor dispensou a implementação dos RNF no Kanban, mas eles continuam no documento e, por isso, entram nesta verificação.


## 4. Tabela de registro (seção 6 das Regras)

Legenda: ✓ passou; ✗ falhou (regras violadas). As falhas ESP07, ESP08, ANA02 e ANA11 são do documento inteiro e por isso aparecem em todas as linhas. ESP06, ESP09, ESP10, ANA06, ANA07, ANA09 e ANA10 passaram em todos os requisitos e não são repetidas na tabela.

| Requisito | NOM | ESP01-05 | ESP06-10 | ANA01-04 | ANA05-08 | ANA09-11 | Revisor | Resultado |
|---|---|---|---|---|---|---|---|---|
| RF001 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF001.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF001.2 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF001.3 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF001.4 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF002 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF002.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF002.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF002.3 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF003 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF003.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA05, ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF003.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF003.3 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA05, ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF003.4 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA05, ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF004 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF004.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF004.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF005 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF005.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF005.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF005.3 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF005.4 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF006 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF006.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF006.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF007 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF007.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF008 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF008.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF009 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF009.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF009.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF010 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF010.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF010.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF010.3 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF011 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF011.1 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF012 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF012.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF012.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF012.3 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF012.4 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF012.5 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF012.6 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF013 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF013.1 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF013.2 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF014 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF014.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF014.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF014.3 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF015 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF015.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF015.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF015.3 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA05, ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF015.4 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF016 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF016.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF016.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF016.3 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF023 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF023.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF023.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF023.3 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF023.4 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF017 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF017.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF017.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF017.3 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF018 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF018.1 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF018.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF018.3 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF018.4 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF019 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF019.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF019.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF020 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF020.1 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF020.2 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF021 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF021.1 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF022 | ✗ NOM01, NOM04 | ✗ ESP03, ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA03, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF022.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF022.2 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF022.3 | ✗ NOM01, NOM04 | ✓ | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF022.4 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF022.5 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF022.6 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF024 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF024.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF024.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF024.3 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF024.4 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF025 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF025.1 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |
| RF025.2 | ✗ NOM01, NOM04 | ✗ ESP05 | ✗ ESP07, ESP08 | ✗ ANA01, ANA04 (+ANA02) | ✗ ANA08 | ✗ ANA11 | Gabriel Carvalho Batista | Reprovado |

## 5. Palavras fora do vocabulário fechado (ESP05)

Quantidade de requisitos em que cada palavra aparece fora das listas A3 (glossário), A4 (verbos) e A5 (apoio):

| Palavra | Requisitos |
|---|---|
| amizade | 8 (RF006, RF006.1, RF006.2, RF007, RF007.1, RF008.1, RF009.1, RF023.1) |
| criador | 7 (RF012.2, RF012.4, RF014.1, RF015.1, RF016.2, RF017.1, RF018.3) |
| admin | 6 (RF005.4, RF015.2, RF024, RF024.1, RF025, RF025.1) |
| resposta | 6 (RF007, RF010, RF010.3, RF016, RF016.1, RF016.3) |
| espera | 6 (RF012.6, RF023, RF023.1, RF023.2, RF023.3, RF023.4) |
| banido | 5 (RF001.4, RF003.4, RF024.2, RF024.3, RF024.4) |
| convite | 5 (RF010.3, RF012.4, RF014.3, RF016.2, RF016.3) |
| busca | 3 (RF003.1, RF003.3, RF003.4) |
| perfil | 3 (RF003.2, RF004.1, RF004.2) |
| conta | 3 (RF005.1, RF005.2, RF005.3) |
| pedidos | 3 (RF006, RF007, RF008.1) |
| pedido | 3 (RF006.1, RF006.2, RF007.1) |
| parceiro | 3 (RF009.1, RF010.1, RF010.2) |
| convites | 3 (RF010, RF016, RF017.2) |
| retirar | 3 (RF015.4, RF023.4, RF024.3) |
| sessão | 2 (RF001.3, RF024.2) |
| apelido | 2 (RF002.1, RF003.3) |
| próprio | 2 (RF004.1, RF006.2) |
| qualquer | 2 (RF005.4, RF015.2) |
| aceite | 2 (RF007.1, RF010.1) |
| amigos | 2 (RF008, RF012.4) |
| recusar | 2 (RF010.3, RF016.3) |
| enviar | 2 (RF012.4, RF014.3) |
| adversário | 2 (RF012.6, RF017.3) |
| convidado | 2 (RF012.6, RF016.1) |
| avisar | 2 (RF015.3, RF016.2) |
| entrada | 2 (RF023, RF023.1) |
| aceitar | 2 (RF023.2, RF023.3) |
| quem | 2 (RF019.1, RF019.2) |
| filtrar | 2 (RF022.5, RF022.6) |
| banir | 2 (RF024, RF024.1) |
| reativar | 2 (RF025, RF025.1) |
| acesso | 1 (RF001.1) |
| login | 1 (RF001.4) |
| e-mail | 1 (RF002.2) |
| nome | 1 (RF003.1) |
| trocar | 1 (RF004.2) |
| foto | 1 (RF004.2) |
| manter | 1 (RF005.3) |
| envio | 1 (RF006) |
| duplicado | 1 (RF006.1) |
| pendentes | 1 (RF008.1) |
| formação | 1 (RF009) |
| duas | 1 (RF009.2) |
| ativar | 1 (RF010.1) |
| descartar | 1 (RF010.2) |
| recusada | 1 (RF010.2) |
| criação | 1 (RF012) |
| tipo | 1 (RF012.1) |
| ativa | 1 (RF012.2) |
| dois | 1 (RF012.3) |
| lados | 1 (RF012.3) |
| fixar | 1 (RF012.5) |
| publicar | 1 (RF012.6) |
| agendada | 1 (RF014.2) |
| amigo | 1 (RF014.3) |
| incluído | 1 (RF014.3) |
| própria | 1 (RF015.1) |
| participantes | 1 (RF015.3) |
| recusado | 1 (RF016.2) |
| única | 1 (RF023.2) |
| único | 1 (RF023.3) |
| vaga | 1 (RF023.4) |
| preenchida | 1 (RF023.4) |
| aceitos | 1 (RF017.2) |
| definido | 1 (RF017.3) |
| limitar | 1 (RF018.2) |
| lado | 1 (RF019) |
| e | 1 (RF022) |
| geral | 1 (RF022.1) |
| desempatar | 1 (RF022.4) |
| aproveitamento | 1 (RF022.4) |
| seguido | 1 (RF022.4) |
| saldo | 1 (RF022.4) |
| período | 1 (RF022.6) |
| encerrar | 1 (RF024.2) |
| banidos | 1 (RF025) |
| devolver | 1 (RF025.2) |
| reativado | 1 (RF025.2) |

## 6. Plano de correção

A ordem abaixo resolve o maior número de falhas com o menor esforço.

1. **Atualizar as Regras para a versão 4.0 (MUD04)**, com commit `docs(padroes): alinha regras ao documento de requisitos v3.0`:
   - NOM01 com três dígitos;
   - lista de grupos igual à do documento de requisitos;
   - glossário A3 e verbos A4 com os termos e verbos que o documento de requisitos usa;
   - Apêndice B sem mesas e com as necessidades novas;
   - Benefício com os valores Essencial/Importante/Desejável, se a equipe preferir manter os do documento.
2. **Completar o documento de requisitos:**
   - trocar `NF` por `RNF`;
   - incluir a tabela de histórico (ESP07);
   - incluir a tabela de atributos com Fonte e Verificação em cada RF macro (NOM04, ANA01, ANA04, ANA08).
3. **Corrigir a redação pontual da seção 3:** RF022, RF003.1, RF003.3, RF003.4 e RF015.3, mais ESP01, NOM05 e ESP04 dos RNF.
4. **Rodar esta verificação de novo**, com outro integrante como revisor, e salvar um novo registro com a data do dia.

## 7. Método

As regras objetivas foram aplicadas por script sobre o texto do PDF:
- ESP01 a ESP05: contagem de «DEVE», busca das listas A1 e A2, contagem de palavras, pontos finais e possessivos, comparação com A3, A4 e A5;
- ANA03: conectores «e» e «ou»;
- ANA05: sinônimos remetidos de A3;
- ANA06: termos de A6;
- ANA10: termos de A7 e A8.

As regras que dependem da estrutura do documento (NOM04, ESP07 a ESP10, ANA01, ANA02, ANA04, ANA08, ANA09 e ANA11) foram conferidas por leitura. Na verificação de ESP05, plurais e formas flexionadas dos verbos de A4 foram aceitos.
