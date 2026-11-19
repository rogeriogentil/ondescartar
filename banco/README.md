# Banco de dados

Arquivos do PostgreSQL com PostGIS ([ADR-003](../docs/ADRs/ADR-003-persistencia-dados-consultas-geograficas.md)), organizados como no [ADR-004](../docs/ADRs/ADR-004-organizacao-diretorios-modulos.md#fora-de-src):

- `migracoes/`: migrações versionadas do esquema, em uma pasta única para todo o banco.
- `dados-iniciais/`: dados iniciais dos itens e dos pontos de descarte.

As pastas estão vazias porque o ORM e a ferramenta de migração ainda não foram escolhidos. Até lá, a aplicação usa o repositório em memória com dados fictícios, montado em `src/composicao/pontos-descarte.ts`.
