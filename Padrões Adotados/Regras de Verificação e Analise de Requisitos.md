# Regras de Verificação e Análise de Requisitos

## 1. Objetivo

Este documento estabelece os padrões que deverão ser seguidos pelos integrantes da equipe durante a elaboração, especificação, análise e verificação dos requisitos do sistema TrucoHub.

O objetivo é garantir a qualidade, a uniformidade e a consistência da documentação, facilitando a compreensão dos requisitos por todos os envolvidos no desenvolvimento do projeto.

As regras aqui estabelecidas foram fundamentadas nos critérios de especificação de requisitos apresentados por Rogério Magela, no capítulo 1 do livro *Engenharia de Software Aplicada – Fundamentos*.

## 2. Padrão de nomenclatura

Os requisitos deverão ser identificados por meio de siglas e numeração sequencial, conforme as seguintes categorias:

- **RF (Requisito Funcional):** representa uma funcionalidade ou serviço que o sistema deverá oferecer.
- **RNF (Requisito Não Funcional):** representa uma característica de qualidade ou restrição relacionada ao funcionamento do sistema.

A numeração deverá ser única e sequencial dentro de cada categoria, não podendo ser reutilizada para requisitos diferentes.

Exemplos:

- RF01 – O sistema deverá permitir o cadastro de jogadores.
- RF02 – O sistema deverá permitir a criação de duplas.
- RF03 – O sistema deverá permitir o registro de partidas.
- RNF01 – O sistema deverá disponibilizar uma interface compatível com navegadores web modernos.

## 3. Regras de especificação de requisitos

As regras abaixo deverão ser aplicadas durante a elaboração e revisão dos requisitos do TrucoHub.

### Regra 1 – Correção

Os requisitos deverão representar necessidades reais dos usuários e do contexto em que o sistema será utilizado.

Não deverão ser adicionadas funcionalidades sem justificativa relacionada às necessidades identificadas para o projeto.

**Exemplo:**

Correto: O sistema deverá permitir o registro da pontuação das duplas durante uma partida.

Incorreto: O sistema deverá disponibilizar uma funcionalidade de apostas entre jogadores, caso essa necessidade não faça parte do escopo do projeto.

### Regra 2 – Completude

A especificação deverá contemplar todas as necessidades identificadas para cada funcionalidade, evitando omissões de informações importantes para o desenvolvimento.

**Exemplo:**

Ao especificar o registro de uma partida, deverão ser consideradas informações como as duplas participantes, a mesa utilizada, a data e a pontuação.

### Regra 3 – Ausência de ambiguidade

Cada requisito deverá possuir apenas uma interpretação possível. Deverão ser evitadas expressões subjetivas ou termos que permitam diferentes entendimentos.

**Exemplo:**

Incorreto: O sistema deverá apresentar rapidamente o resultado da partida.

Correto: O sistema deverá atualizar o resultado da partida após a confirmação da alteração da pontuação.

### Regra 4 – Verificabilidade

Todo requisito deverá permitir a realização de uma verificação objetiva para determinar se foi atendido.

Deverão ser evitadas expressões subjetivas, como "interface amigável", "sistema rápido" ou "facilidade de utilização", sem critérios mensuráveis ou condições que permitam sua avaliação.

**Exemplo:**

Correto: O sistema deverá impedir o cadastro de uma partida sem a seleção de duas duplas participantes.

Esse comportamento poderá ser verificado por meio de testes.

### Regra 5 – Consistência

Os requisitos não deverão apresentar contradições entre si. A documentação deverá manter uniformidade na utilização de termos e conceitos relacionados ao sistema.

Deverá ser mantido um vocabulário padronizado para identificar as entidades e funcionalidades do projeto.

**Exemplo:**

O termo "Dupla" deverá ser utilizado consistentemente para representar uma formação de dois jogadores, evitando alternâncias desnecessárias com termos como "equipe" ou "time".

### Regra 6 – Compreensibilidade

A especificação deverá utilizar uma linguagem que possa ser compreendida tanto pelos usuários quanto pelos integrantes responsáveis pelo desenvolvimento.

Deverão ser evitadas descrições excessivamente técnicas, notações desnecessariamente complexas e termos que não façam parte do vocabulário conhecido pelos envolvidos.

Quando forem necessários termos específicos do domínio, seus significados deverão ser apresentados em um glossário.

### Regra 7 – Rastreabilidade

Cada requisito deverá possuir uma identificação que permita acompanhar sua origem e sua relação com os demais elementos do projeto.

Deverá ser possível identificar a necessidade que originou determinado requisito e relacioná-lo às funcionalidades implementadas e aos testes correspondentes.

A rastreabilidade deverá facilitar a identificação dos impactos causados por eventuais alterações nos requisitos.

## 4. Procedimentos de verificação e análise

Antes de um requisito ser considerado aprovado para implementação, deverá passar por uma revisão, verificando se:

1. Possui identificação conforme o padrão de nomenclatura estabelecido.
2. Representa uma necessidade real do projeto.
3. Apresenta informações suficientes para sua compreensão e implementação.
4. Não permite interpretações diferentes.
5. Pode ser verificado por meio de testes ou inspeções.
6. Não apresenta contradições com outros requisitos.
7. Utiliza os termos padronizados na documentação.
8. Possui origem identificável e relação com as funcionalidades do sistema.

Caso algum requisito não atenda aos critérios estabelecidos, deverá ser revisado antes de sua aprovação.

## 5. Aplicação das regras

Todos os integrantes da equipe deverão seguir os padrões estabelecidos neste documento durante a elaboração, revisão e atualização da especificação de requisitos do TrucoHub.

As regras deverão ser aplicadas de maneira uniforme, independentemente do integrante responsável pela elaboração do requisito.

Qualquer alteração nos padrões deverá ser discutida entre os integrantes e registrada na documentação do projeto.

## 6. Referência bibliográfica

MAGELA, Rogério. *Engenharia de Software Aplicada – Fundamentos*. Capítulo 1: Análise de Requisitos. Seção 7.3: Especificação de Requisitos.