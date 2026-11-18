# Código

## Idioma
- Código em português do Brasil: identificadores, nomes de arquivos e pastas, comentários, mensagens e documentação.
- Identificadores e nomes de arquivos e pastas sem acentos nem ç (por exemplo, `Horario` e `pontos-descarte`). Textos exibidos ao usuário, comentários e documentação usam a acentuação normal.
- Exceções: nomes impostos pelo Next.js e pelas ferramentas (`app/`, `page.tsx`, `layout.tsx`, `route.ts`, `package.json`) e palavras reservadas da linguagem.

## Nomes
- **Arquivos e pastas:** kebab-case, inclusive componentes React (por exemplo, `lista-pontos.tsx`).
- **Tipos, classes, interfaces e componentes:** PascalCase (por exemplo, `PontoDescarte` e `ListaPontos`).
- **Funções e variáveis:** camelCase.
- **Casos de uso:** um por arquivo, com verbo no infinitivo (por exemplo, `buscar-pontos-por-item.ts` exporta `buscarPontosPorItem`).
- **Portas:** nome do papel, sem prefixo `I`, em `aplicacao/portas/` (por exemplo, `RepositorioPontosDescarte`).
- **Adaptadores:** nome do papel seguido da tecnologia ou da variante (por exemplo, `RepositorioPontosDescartePostgres`, `RepositorioPontosDescarteEmMemoria` e `GeradorLinkMapaGoogleMaps`).

## Testes
- **Unidade:** `*.test.ts`, ao lado do código testado.
- **Integração:** `*.integracao.test.ts`, ao lado do código testado.
- **Ponta a ponta:** em `tests/e2e/`.

## Estrutura
A organização de pastas e as regras de importação estão no [ADR-004](../ADRs/ADR-004-organizacao-diretorios-modulos.md).
