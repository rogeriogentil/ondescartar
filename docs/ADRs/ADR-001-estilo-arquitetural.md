# ADR-001: Estilo arquitetural da aplicação

- **Status:** proposta
- **Versão:** 1.0.0
- **Responsável:** Rogerio J. Gentil
- **Data:** 2026-11-12

## Decisão (Y-statement)
No contexto do **MVP do Ondescartar, uma plataforma web para moradores de São Carlos**,
diante da necessidade de **entregar rápido, com custo próximo de zero e com uma equipe de uma pessoa**,
decidimos por **um monólito modular, com separação explícita entre apresentação e controle (front-end) e negócio, integração e persistência (back-end)**,
e não **um monólito não modular (sem fronteiras explícitas entre as camadas) nem um front-end e uma API implantados separadamente**,
para alcançar **manutenibilidade, testabilidade e evolutividade, respeitando a restrição de custo próximo de zero no MVP e mantendo simples o CI com GitHub Actions**,
aceitando que **as fronteiras entre camadas dependem de disciplina e de verificação automática, e que o sistema é implantado e escala como uma unidade só**.

## Atributos de qualidade e restrições relacionados
- **Manutenibilidade, testabilidade e evolutividade:** camadas separadas, regras de negócio testáveis de forma isolada e possibilidade de trocar peças (mapa, hospedagem) ou separar front e back no futuro.
- **Observabilidade:** um único processo facilita coletar métricas, logs e eventos de uso.
- **Restrição de negócio, custo próximo de zero no MVP:** uma única aplicação a hospedar.
- **Restrição de negócio, GitHub e CI com GitHub Actions:** um repositório e um pipeline.

## Consequências

### Benefícios
- Um repositório, um deploy e um pipeline de CI, com operação simples e custo baixo.
- Regras de negócio sem dependência de React, Next.js ou do ORM, testáveis de forma isolada.
- Persistência e integração acessadas por interfaces, o que facilita trocar mapa, banco ou hospedagem e extrair o back-end depois.
- Observabilidade centralizada em um só lugar.

### Custos e riscos
- As fronteiras entre camadas não são impostas pela infraestrutura, e dependem de disciplina.
  - Mitigação: fitness functions no CI que bloqueiam o merge quando a direção das dependências é violada (por exemplo, o negócio importar React, Next.js ou o ORM).
- O sistema escala e é implantado como uma unidade só.
  - Mitigação: aceitável para o volume de uma cidade no MVP, e a extração do back-end continua possível.
- Extrair o back-end mais tarde ainda dá algum retrabalho.
  - Mitigação: manter as interfaces de persistência e integração desde o início.

### Alternativas descartadas
- **Monólito não modular:** descartado porque a falta de fronteiras entre camadas dificultaria testar o negócio de forma isolada e extrair o back-end no futuro.
- **Front-end e API implantados separadamente:** descartado no MVP pelo custo e pela complexidade operacional, e mantido como possível evolução.

## Referência
Recomendação de começar por um monólito ("Monolith First", Martin Fowler).
