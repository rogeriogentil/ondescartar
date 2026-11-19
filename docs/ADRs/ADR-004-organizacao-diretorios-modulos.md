# ADR-004: Organização de diretórios e módulos do código

- **Status:** proposta
- **Versão:** 1.0.0
- **Domínio:** Aplicação
- **Responsável:** Rogerio J. Gentil
- **Data:** 2026-11-18

## Decisão (Y-statement)
No contexto do **MVP do Ondescartar, monólito modular em Next.js com TypeScript e PostgreSQL com PostGIS ([ADR-001](ADR-001-estilo-arquitetural.md), [ADR-002](ADR-002-linguagem-framework.md) e [ADR-003](ADR-003-persistencia-dados-consultas-geograficas.md))**,
diante da necessidade de **tornar as camadas e os módulos visíveis na estrutura do código e verificáveis no CI, já que o Next.js não impõe essa separação**,
decidimos por **organizar o código por módulos de domínio, com as camadas dentro de cada módulo (domínio, aplicação, infraestrutura e apresentação), no estilo Portas e Adaptadores (arquitetura hexagonal), com a pasta `app/` do Next.js restrita às rotas e as regras de importação verificadas por fitness functions**,
e não **uma organização por camadas no topo nem uma organização híbrida, com as camadas no topo e os módulos dentro delas**,
para alcançar **manutenibilidade, testabilidade e evolutividade, com módulos coesos e extraíveis e regras de negócio testáveis sem banco e sem framework, respeitando os princípios de separação em camadas e de verificação automatizada**,
aceitando que **há mais pastas do que código no início, que um módulo só acessa outro pela interface pública dele e que as regras de importação precisam ser mantidas junto com o código**.

## Estrutura

### Módulos
Cada módulo corresponde a um subdomínio do problema, como no Domain-Driven Design (DDD), e os módulos são definidos à medida que as funcionalidades são especificadas. A título de exemplo, o projeto poderia ter um módulo `itens` (catálogo de itens e categorias) e um módulo `pontos-descarte` (locais, horários e itens aceitos), com a busca por item como um caso de uso de `pontos-descarte`, e não como um módulo à parte.

```
src/
├── app/                      rotas do App Router do Next.js
├── modulos/
│   └── <modulo>/             um por subdomínio
│       ├── dominio/
│       ├── aplicacao/
│       │   └── portas/
│       ├── infraestrutura/
│       │   ├── persistencia/
│       │   └── integracao/
│       ├── apresentacao/
│       └── index.ts          interface pública do módulo
├── compartilhado/            dominio/, aplicacao/portas/, infraestrutura/ e apresentacao/ comuns aos módulos
└── composicao/               uma pasta única para todos os módulos
    └── <modulo>.ts           monta os casos de uso do módulo com os adaptadores concretos
```

Um módulo só tem as pastas de camada que usa. Por exemplo, um módulo sem integração com terceiros não tem `infraestrutura/integracao/`.

### Camadas e papéis
| Pasta | Conteúdo | Papel em Portas e Adaptadores |
|---|---|---|
| `dominio/` | entidades, objetos de valor e regras de negócio, em TypeScript puro | núcleo |
| `aplicacao/` | casos de uso, um por arquivo, e as interfaces de que eles precisam, em `aplicacao/portas/` | núcleo: os casos de uso são as portas de entrada, e as interfaces, as portas de saída |
| `infraestrutura/persistencia/` | repositórios em banco relacional (SQL), na data desta decisão o PostgreSQL com PostGIS ([ADR-003](ADR-003-persistencia-dados-consultas-geograficas.md)), e em memória, para testes | adaptadores de saída |
| `infraestrutura/integracao/` | integração com APIs e sistemas de terceiros, como os sites de mapas do link "Abrir no mapa" e o relógio do sistema | adaptadores de saída |
| `apresentacao/` | componentes React do módulo | adaptadores de entrada, junto com `app/` |
| `src/app/` | páginas, layouts e rotas do Next.js | adaptadores de entrada |
| `src/composicao/` | um arquivo por módulo, que monta os casos de uso daquele módulo com os adaptadores concretos | raiz de composição |

A pasta `src/app/` tem o nome imposto pelo App Router do Next.js e não se confunde com `aplicacao/`, a camada de aplicação de cada módulo: uma só existe em `src/`, e a outra só dentro de `src/modulos/<modulo>/`.

Os padrões táticos do DDD (entidades, objetos de valor, agregados e repositórios) são usados onde o modelo pede, sem obrigatoriedade, porque o domínio do MVP é simples.

### Fluxo de uma requisição
Os casos de uso ficam na pasta `aplicacao/` do seu módulo e conhecem apenas as portas, sem saber quais adaptadores as implementam. Em `composicao/`, um arquivo por módulo faz essa ligação: cria cada caso de uso com os adaptadores concretos (por exemplo, `buscarPontosPorItem` com o repositório SQL, o gerador de links de mapa e o relógio do sistema) e o exporta pronto para uso. A pasta não reúne os casos de uso, só os monta.

As páginas em `app/` importam os casos de uso já montados de `composicao/` e os chamam diretamente no servidor, sem chamadas HTTP intermediárias, e os componentes de `apresentacao/` recebem o resultado. Nos testes, os mesmos casos de uso são criados com adaptadores em memória, sem passar por `composicao/`.

### Regras de importação
Verificadas no CI por fitness functions, que bloqueiam o merge quando uma regra é violada:

| Pasta | Pode importar |
|---|---|
| `dominio/` | o próprio `dominio/` e `compartilhado/dominio/` |
| `aplicacao/` | `dominio/` e `compartilhado/aplicacao/` |
| `infraestrutura/` | `aplicacao/`, `dominio/` e `compartilhado/infraestrutura/`; `persistencia/` e `integracao/` não importam uma à outra |
| `apresentacao/` | tipos de `aplicacao/` e `dominio/` e `compartilhado/apresentacao/`; nunca `infraestrutura/` |
| outro módulo | só o `index.ts` dele |
| `app/` | o `index.ts` dos módulos, `composicao/` e `compartilhado/apresentacao/` |
| `composicao/` | qualquer pasta |

Além disso:
- `dominio/` e `aplicacao/` não importam React, Next.js, ORM nem driver de banco.
- Nenhuma pasta importa `app/`.
- Ciclos de dependência são proibidos.

### Fora de `src/`
| Pasta | Conteúdo |
|---|---|
| `banco/migracoes/` | migrações versionadas do esquema, em uma pasta única para todo o banco |
| `banco/dados-iniciais/` | dados iniciais dos itens e dos pontos de descarte |
| `scripts/` | carga de dados e utilitários de desenvolvimento |
| `tests/e2e/` | testes de ponta a ponta, que atravessam a aplicação inteira |

Os testes de unidade e de integração ficam ao lado do código que testam, dentro do módulo. Os nomes de arquivos, pastas e identificadores seguem a [convenção de código](../convencoes/codigo.md).

## Atributos de qualidade e restrições relacionados
- **Manutenibilidade, testabilidade e evolutividade:** cada módulo reúne tudo de um assunto, as regras de negócio são testadas com adaptadores em memória e um módulo pode ser extraído sem juntar pedaços de várias pastas.
- **Confiabilidade:** as regras dos dados dos pontos de descarte ficam no domínio, testadas de forma isolada, e os repositórios são testados contra o PostgreSQL real em contêiner ([ADR-003](ADR-003-persistencia-dados-consultas-geograficas.md)).
- **Desempenho:** as páginas chamam os casos de uso no servidor, sem uma chamada HTTP a mais.
- **Princípios de separação em camadas e de verificação automatizada:** as camadas ficam visíveis nas pastas e as regras de importação são verificadas no CI.
- **Restrição de negócio, GitHub e CI com GitHub Actions:** as fitness functions rodam no mesmo pipeline dos testes.

## Consequências

### Benefícios
- A estrutura de pastas mostra os módulos e as camadas, e é a mesma em todos os módulos.
- As regras de negócio não dependem de React, Next.js, ORM ou banco, e são testadas sem eles.
- Trocar uma tecnologia (banco, site de mapas, ferramenta de métricas) significa escrever um novo adaptador, sem mudar o núcleo.
- Um módulo pode ser extraído para outro serviço levando apenas a sua pasta.
- Os testes ficam perto do código e saem junto com o módulo.

### Custos e riscos
- Há mais pastas do que código no início.
  - Mitigação: cada módulo só cria as pastas de camada que usa.
- A pasta `app/`, do Next.js, e a camada `aplicacao/` têm nomes parecidos.
  - Mitigação: este ADR registra a distinção, e as duas pastas nunca aparecem lado a lado.
- O acesso entre módulos só pelo `index.ts` bloqueia atalhos.
  - Mitigação: o `index.ts` expõe o que os outros módulos precisam; uma necessidade frequente de atalhos indica que os limites dos módulos devem ser revistos.
- As regras de importação precisam acompanhar a estrutura.
  - Mitigação: a configuração das fitness functions fica versionada no repositório e muda junto com a estrutura.

### Alternativas descartadas
- **Por camadas no topo (`src/dominio`, `src/aplicacao`, `src/infraestrutura`):** espalha cada assunto por várias pastas e esconde os módulos do monólito modular.
- **Híbrida, com camadas no topo e módulos dentro delas:** mantém o espalhamento, e extrair um módulo exige juntar pedaços de várias pastas.
- **Páginas obtendo os dados por chamadas HTTP a rotas da própria aplicação:** acrescenta uma chamada de rede a cada página, o que prejudica o desempenho em rede móvel.
- **Regras de importação só entre camadas:** os módulos poderiam importar as pastas internas uns dos outros e se acoplar sem perceber.
- **Camada de aplicação chamada `casos-de-uso/`:** evitaria a semelhança com `app/`, mas as portas não são casos de uso, e `aplicacao` é o termo do [ADR-001](ADR-001-estilo-arquitetural.md), do DDD e da arquitetura em camadas.
- **Testes em uma árvore separada, como o `src/test` do Maven:** afasta o teste do código e dificulta extrair um módulo com os seus testes.

## Referências
- [ADR-001: Estilo arquitetural da aplicação](ADR-001-estilo-arquitetural.md)
- [ADR-002: Linguagem e framework da aplicação](ADR-002-linguagem-framework.md)
- [ADR-003: Persistência de dados e consultas geográficas](ADR-003-persistencia-dados-consultas-geograficas.md)
- [Convenção de código](../convencoes/codigo.md)
- Arquitetura hexagonal (Portas e Adaptadores), Alistair Cockburn: [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/).
- Domain-Driven Design, Eric Evans: [Domain Language](https://www.domainlanguage.com/ddd/).
- Estrutura de projetos do App Router: [Next.js Project Structure](https://nextjs.org/docs/app/getting-started/project-structure).
- Verificação das regras de importação: [dependency-cruiser](https://github.com/sverweij/dependency-cruiser).
