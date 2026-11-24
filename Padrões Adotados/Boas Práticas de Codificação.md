# Boas Práticas de Codificação

**Projeto:** TrucoHub
**Pasta:** Padrões Adotados
**Equipe:** Bruno dos Santos Custódio e Gabriel Carvalho Batista
**Versão:** 1.0

## 1. Objetivo

Este documento define as regras de codificação que a equipe segue em todo o código do TrucoHub (HTML, CSS e JavaScript, no frontend e no backend com Firebase).

O objetivo é que qualquer integrante consiga ler, entender e alterar o código do outro sem precisar perguntar como ele foi pensado.

As regras foram escolhidas a partir do material de codificação da disciplina (Clean Code e SOLID). As regras **BP01** (padrão de notação) e **BP02** (documentação e comentários) são obrigatórias pela Sprint 2.

| ID | Regra | Origem |
|---|---|---|
| BP01 | Padrão de notação e nomes significativos | Clean Code (cap. 2) |
| BP02 | Documentação e comentários de código | Clean Code (cap. 4), JSDoc |
| BP03 | Funções pequenas com uma única responsabilidade | Clean Code (cap. 3), SOLID (S) |
| BP04 | Separação em camadas e dependência de abstrações | SOLID (S, D) |
| BP05 | Sem números e textos mágicos | Clean Code (cap. 17) |
| BP06 | Tratamento de erros explícito | Clean Code (cap. 7) |
| BP07 | Não repetir código (DRY) | Clean Code, *The Pragmatic Programmer* |
| BP08 | Formatação padronizada | Clean Code (cap. 5) |

Cada regra traz o que fazer, o motivo, um exemplo e uma verificação objetiva. As verificações da seção 3 são usadas na revisão de cada Pull Request.

---

## 2. Regras

### BP01 – Padrão de notação e nomes significativos

**Regra:** os nomes seguem a tabela abaixo. Termos do domínio (jogador, dupla, partida, mão, pontos) ficam em **português, sem acento e sem cedilha**, com os mesmos nomes do Documento de Requisitos. Nomes não são abreviados (exceto `id`).

| Elemento | Notação | Exemplo |
|---|---|---|
| Variáveis e parâmetros | camelCase | `pontosDupla`, `jogadorLogado` |
| Funções e métodos | camelCase, começando por verbo | `cadastrarJogador()`, `registrarPontos()` |
| Classes | PascalCase, substantivo no singular | `Jogador`, `Partida`, `PartidaService` |
| Constantes globais | UPPER_SNAKE_CASE | `PONTOS_PARA_VENCER` |
| Variáveis booleanas | camelCase, com `is`/`tem`/`pode`/`esta` | `estaBanido`, `podeIniciar` |
| Arquivos `.js`, `.css`, `.html` | kebab-case | `jogador-service.js`, `ranking.html` |
| Classes CSS e `id` no HTML | kebab-case | `.placar-partida`, `#botao-criar-conta` |
| Coleções do Firestore | minúsculo, plural | `jogadores`, `partidas`, `duplas` |
| Campos de documentos do Firestore | camelCase | `apelido`, `criadoEm` |

As funções de cada caso de uso usam o verbo do requisito: RF002 Cadastrar Jogador → `cadastrarJogador()`; RF018 Registrar Pontos → `registrarPontos()`.

**Por quê:** um padrão único evita discussões e deixa claro, só pelo nome, se algo é classe, função ou constante. Usar os nomes dos requisitos liga o código à documentação.

```javascript
// ❌ Evitar
const p = 12;
let jgdr_nome = 'Ana';
function Pts(d, v) { /* ... */ }

// ✅ Seguir
const PONTOS_PARA_VENCER = 12;
let nomeJogador = 'Ana';
function somarPontosDaDupla(dupla, valorDaMao) { /* ... */ }
```

**Verificação:** nenhum identificador fora da notação da tabela; nenhum nome com 1 ou 2 letras, exceto `i`/`j` em laços `for` e `id`.

---

### BP02 – Documentação e comentários de código

**Regra:**

1. Toda função, classe ou método **exportado** (`export`) tem um comentário **JSDoc** com descrição, `@param`, `@returns` e, quando houver, `@throws`.
2. Funções que implementam um requisito citam o requisito com `@see RFxxx`.
3. Comentários dentro do código explicam **por que** algo é feito, não **o que** a linha faz.
4. Não fica código comentado (desativado) no repositório: o histórico do Git guarda as versões antigas.
5. Pendências usam `// TODO:` seguido da descrição e, se houver, do número da issue.
6. Comentários e JSDoc são escritos em português.

**Por quê:** o JSDoc aparece no autocompletar do VS Code e documenta o contrato da função sem que seja preciso ler o corpo dela. Comentários que repetem o código ficam desatualizados e confundem.

```javascript
// ❌ Evitar
// soma 1
contador = contador + 1;
// function antigaRegistrarPontos(p) { ... }

// ✅ Seguir
/**
 * Registra os pontos de uma mão na partida em andamento.
 *
 * @see RF018
 * @param {string} partidaId - ID do documento da partida no Firestore.
 * @param {'nos'|'eles'} lado - Lado que ganhou a mão.
 * @param {number} valorDaMao - Valor da mão: 1, 3, 6, 9 ou 12.
 * @returns {Promise<Partida>} A partida com o placar atualizado.
 * @throws {Error} Se o valor da mão não for permitido.
 */
export async function registrarPontos(partidaId, lado, valorDaMao) {
  // O placar é limitado a 12 para não passar do ponto de vitória
  // quando a mão vale mais do que falta para o lado vencer.
  // ...
}
```

**Verificação:** toda declaração com `export` tem um bloco `/** ... */` logo acima; nenhum bloco de código comentado no diff do Pull Request.

---

### BP03 – Funções pequenas com uma única responsabilidade

**Regra:** cada função faz uma única coisa. Uma função tem **no máximo 30 linhas** e **no máximo 3 parâmetros**; acima disso, ela é dividida ou recebe um objeto. Evitar mais de 2 níveis de `if`/laço aninhados (usar retorno antecipado).

**Por quê:** é o Princípio da Responsabilidade Única (o "S" do SOLID) aplicado a funções. Funções pequenas são mais fáceis de testar, nomear e reaproveitar.

```javascript
// ❌ Evitar: valida, salva e mexe na tela na mesma função
async function cadastrar() {
  const nome = document.querySelector('#nome').value;
  if (nome !== '') {
    if (senha.length >= 8) {
      await fetch('/api/jogadores', { method: 'POST' /* ... */ });
      document.querySelector('#mensagem').textContent = 'Conta criada!';
    }
  }
}

// ✅ Seguir: cada função com uma responsabilidade
function validarCadastro(dadosJogador) { /* só valida */ }
async function cadastrarJogador(dadosJogador) { /* só chama a API */ }
function exibirMensagem(texto) { /* só atualiza a tela */ }
```

**Verificação:** nenhuma função com mais de 30 linhas ou mais de 3 parâmetros.

---

### BP04 – Separação em camadas e dependência de abstrações

**Regra:** o código segue as camadas da estrutura de pastas do README (seção 5). O backend é uma API em Node.js com Express e `firebase-admin`, e cada camada só chama a camada logo abaixo:

```text
frontend (telas)  →  routes  →  controllers  →  services  →  models / Firestore
  fetch() na API    URL e     lê a requisição   regras de     estrutura dos
                    método    e devolve status  negócio       dados e acesso
```

1. O frontend (`src/frontend/`) **não** acessa o Firestore: ele chama a API com `fetch()`.
2. As *routes* só ligam URL e método HTTP a um *controller*.
3. Os *controllers* leem a requisição, chamam o *service* e devolvem a resposta com o status HTTP. Eles não contêm regra de negócio.
4. As regras de negócio (ex.: a partida termina em 12 pontos) ficam nos *services*.
5. O Firebase é inicializado em um único arquivo em `src/config/`, importado por quem precisa.

**Por quê:** aplica o "S" (responsabilidade única) e o "D" (inversão de dependência) do SOLID. Se o banco mudar, só a camada de dados muda; as telas e as rotas continuam iguais.

```javascript
// ❌ Evitar: a rota valida, acessa o banco e monta a resposta
router.put('/jogadores/:id', async (req, res) => {
  if (req.body.apelido.length < 3) return res.status(400).send('erro');
  await db.collection('jogadores').doc(req.params.id).update(req.body);
  res.send('ok');
});

// ✅ Seguir: cada camada com o seu papel
// routes/jogador-routes.js
router.put('/jogadores/:id', jogadorController.alterarJogador);

// controllers/jogador-controller.js
export async function alterarJogador(req, res) {
  try {
    const jogador = await jogadorService.alterarJogador(req.params.id, req.body);
    res.status(200).json(jogador);
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
}
```

**Verificação:** nenhum `import` do Firebase em `src/frontend/`; nenhum acesso ao Firestore (`db.collection`) em *routes* ou *controllers*; `initializeApp` aparece em um único arquivo.

---

### BP05 – Sem números e textos mágicos

**Regra:** valores com significado no negócio (pontuação, tempos, limites) e nomes de coleções ficam em **constantes nomeadas**, declaradas uma vez e importadas onde forem usadas.

**Por quê:** o nome da constante explica o valor, e uma mudança nas regras é feita em um único lugar.

```javascript
// ❌ Evitar
if (partida.pontosNos >= 12) { /* ... */ }
setTimeout(expirarConvite, 180000);

// ✅ Seguir
export const PONTOS_PARA_VENCER = 12;
export const VALORES_DE_MAO = [1, 3, 6, 9, 12];
export const TEMPO_EXPIRACAO_CONVITE_MS = 180 * 1000; // NF007
export const COLECAO_JOGADORES = 'jogadores';

if (partida.pontosNos >= PONTOS_PARA_VENCER) { /* ... */ }
setTimeout(expirarConvite, TEMPO_EXPIRACAO_CONVITE_MS);
```

**Verificação:** nenhum número diferente de `0`, `1` ou `-1` escrito direto em uma condição ou cálculo de regra de negócio; nenhum nome de coleção escrito como texto fora do arquivo de constantes.

---

### BP06 – Tratamento de erros explícito

**Regra:**

1. Código assíncrono usa `async`/`await` (sem encadear `.then()`).
2. Toda chamada ao Firebase fica dentro de `try`/`catch`, em algum ponto da cadeia de chamadas.
3. Um `catch` nunca fica vazio: ele registra o erro (`console.error`) e mostra ao usuário uma mensagem em português (NF014).
4. Os *services* lançam erros (`throw new Error('...')`) com mensagem clara; quem mostra a mensagem na tela é a camada de interface.

**Por quê:** erros silenciosos escondem defeitos. Mensagens claras ajudam o usuário e quem vai corrigir o problema.

```javascript
// ❌ Evitar
try {
  await excluirJogador(id);
} catch (e) {}

// ✅ Seguir
try {
  await excluirJogador(id);
  exibirMensagem('Conta excluída com sucesso.');
} catch (erro) {
  console.error('Erro ao excluir jogador:', erro);
  exibirMensagem('Não foi possível excluir a conta. Tente novamente.');
}
```

**Verificação:** nenhum `catch` vazio e nenhum `.then()` encadeado no diff.

---

### BP07 – Não repetir código (DRY)

**Regra:** se um trecho de lógica aparece **duas vezes**, ele vira uma função compartilhada. Funções usadas por várias telas ficam em um arquivo de utilitários (ex.: `src/frontend/js/utils/`).

**Por quê:** código duplicado precisa ser corrigido em vários lugares, e é comum esquecer um deles.

```javascript
// ❌ Evitar: a mesma validação copiada em cadastro e alteração
if (!email.includes('@') || senha.length < 8) { /* ... */ }

// ✅ Seguir
export const TAMANHO_MINIMO_SENHA = 8;

/**
 * Verifica se os dados de acesso do jogador são válidos.
 *
 * @param {string} email - E-mail informado.
 * @param {string} senha - Senha informada.
 * @returns {boolean} `true` se e-mail e senha forem válidos.
 */
export function validarDadosDeAcesso(email, senha) {
  return email.includes('@') && senha.length >= TAMANHO_MINIMO_SENHA;
}
```

**Verificação:** nenhum bloco de 5 linhas ou mais repetido em dois arquivos.

---

### BP08 – Formatação padronizada

**Regra:**

| Item | Padrão |
|---|---|
| Indentação | 2 espaços (sem tabulação) |
| Fim de instrução | sempre com ponto e vírgula `;` |
| Textos em JavaScript | aspas simples `'...'`; template string `` `...` `` só quando houver variável |
| Declaração de variáveis | `const` por padrão, `let` se o valor muda; **nunca** `var` |
| Comparação | `===` e `!==` (nunca `==` ou `!=`) |
| Tamanho da linha | até 100 caracteres |
| Imports | no topo do arquivo, um por linha |
| Atributos HTML | aspas duplas `"..."`; `lang="pt-BR"` em todas as páginas |

Para não depender de memória, o VS Code deve estar com *Format On Save* ligado e com o Prettier usando essas opções.

**Por quê:** formatação igual em todos os arquivos faz o diff do Pull Request mostrar só mudanças reais, e não troca de espaços ou aspas.

```javascript
// ❌ Evitar
var total=0
if(pontos==12){ total=total+1 }

// ✅ Seguir
let totalVitorias = 0;
if (pontos === PONTOS_PARA_VENCER) {
  totalVitorias += 1;
}
```

**Verificação:** nenhum `var`, `==` ou `!=` no diff; indentação de 2 espaços em todos os arquivos alterados.

---

## 3. Checklist de revisão do Pull Request

O revisor (integrante diferente do autor) marca cada item antes de aprovar o Pull Request. Se algum item falhar, o PR volta para o autor.

- [ ] **BP01** – nomes seguem a tabela de notação e não há abreviações.
- [ ] **BP02** – funções exportadas têm JSDoc (com `@see RFxxx` quando implementam um requisito); não há código comentado.
- [ ] **BP03** – nenhuma função com mais de 30 linhas ou mais de 3 parâmetros.
- [ ] **BP04** – frontend, *routes* e *controllers* não acessam o Firestore diretamente.
- [ ] **BP05** – não há números ou nomes de coleção soltos no código.
- [ ] **BP06** – não há `catch` vazio; mensagens ao usuário em português.
- [ ] **BP07** – não há trecho de lógica duplicado.
- [ ] **BP08** – sem `var`, `==` ou `!=`; formatação com 2 espaços.
- [ ] Commits e nome da branch seguem as regras de Git do README (seção 6).

## 4. Alteração destas regras

Qualquer integrante pode propor mudar uma regra abrindo um Pull Request neste arquivo, com o motivo da mudança na descrição. A mudança vale depois de aprovada pelo outro integrante, e a versão no topo do documento é incrementada.
