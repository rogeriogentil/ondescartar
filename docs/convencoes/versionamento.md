# Versionamento

## Documentos e ADRs
Cada ADR tem a versão no cabeçalho, no formato `MAJOR.MINOR.PATCH`:
- **MAJOR:** a decisão muda.
- **MINOR:** conteúdo é acrescentado sem mudar a decisão.
- **PATCH:** correção de texto, sem mudar o conteúdo.

A versão no índice de [ADRs](../ADRs/README.md) acompanha a do cabeçalho.

## Código e releases
- [Versionamento Semântico (SemVer)](https://semver.org/lang/pt-BR/), com uma tag no Git para cada release (por exemplo, `v0.1.0`).
- Versões `0.x` até a primeira versão estável, a `1.0.0`.
- As mudanças de cada release ficam no `CHANGELOG.md`, no formato [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## API
- O número na rota (por exemplo, `/api/v1`) muda só com uma mudança incompatível, como definido no [ADR-001](../ADRs/ADR-001-estilo-arquitetural.md).
- Mudanças compatíveis, como um campo novo na resposta, não mudam o número da rota.

## Mensagens de commit
- Padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/): `tipo(escopo opcional): descrição`.
- Tipos mais usados: `feat`, `fix`, `docs`, `refactor`, `test`, `chore` e `ci`.
- Descrição em português, no presente (por exemplo, `docs: adiciona convenção de versionamento`).
- Mudanças incompatíveis são marcadas com `!` após o tipo ou com o rodapé `BREAKING CHANGE:`.
