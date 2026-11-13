# ADR-003: PostgreSQL com PostGIS como SGBD

- **Status:** proposta
- **Versão:** 1.0.0
- **Responsável:** Rogerio J. Gentil
- **Data:** 2026-11-12

## Decisão (Y-statement)
No contexto do **MVP do Ondescartar, monólito modular em Next.js com TypeScript (ADR-001 e ADR-002)**,
diante da necessidade de **armazenar pontos de descarte com localização, itens aceitos e horários, e de buscá-los por item e por localização**,
decidimos por **PostgreSQL com a extensão PostGIS**,
e não **MySQL ou MariaDB, SQLite com SpatiaLite ou MongoDB**,
para alcançar **confiabilidade dos dados, manutenibilidade e testabilidade, respeitando as restrições de custo próximo de zero, de CI com GitHub Actions e de familiaridade da equipe com bancos relacionais**,
aceitando que **há mais configuração e operação do que em um banco embutido, e que a hospedagem precisa oferecer o PostGIS**.

## Atributos de qualidade e restrições relacionados
- **Confiabilidade:** integridade relacional, chaves estrangeiras, restrições e transações protegem a qualidade dos dados.
- **Manutenibilidade e testabilidade:** migrações de esquema versionadas e banco executável em contêiner nos testes e no CI.
- **Desempenho:** índices geográficos para busca de pontos por localização.
- **Observabilidade:** consultas SQL ad hoc para medir usuários e buscas e investigar dados.
- **Restrição de negócio, custo próximo de zero:** planos gratuitos ou baratos de PostgreSQL gerenciado, e software aberto.
- **Restrição de negócio, GitHub e CI com GitHub Actions:** serviço de PostgreSQL com PostGIS executável nos pipelines.
- **Restrição de equipe, familiaridade:** conhecimento prévio de bancos relacionais e SQL.

## Consequências

### Benefícios
- Os dados são estruturados e relacionais, o que o modelo relacional representa de forma natural.
- Consultas geográficas maduras e ricas com PostGIS.
- Mesmo banco em desenvolvimento, testes e produção, com contêiner.
- Software aberto, sem custo de licença, e com amplo suporte de ferramentas e ORMs em TypeScript.

### Custos e riscos
- Mais configuração e operação do que um banco embutido.
  - Mitigação: PostgreSQL gerenciado e contêiner para desenvolvimento e testes.
- Nem toda hospedagem gratuita oferece o PostGIS.
  - Mitigação: verificar o suporte antes de escolher a hospedagem; a lógica geográfica fica atrás de uma interface de persistência, o que facilita trocar.
- Um servidor de banco a mais para manter.
  - Mitigação: usar serviço gerenciado e backups automáticos.

### Alternativas descartadas
- **MySQL ou MariaDB:** suporte espacial menos rico que o do PostGIS.
- **SQLite com SpatiaLite:** limita a hospedagem em produção e os acessos simultâneos, e depende de uma extensão para dados geográficos.
- **MongoDB:** menos garantias relacionais e de integridade, pior encaixe para dados estruturados e menos recursos geográficos que o PostGIS.

## Referências
ADR-001 (monólito modular) e ADR-002 (stack).
