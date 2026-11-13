# ADR-002: Linguagem e framework da aplicação

- **Status:** proposta
- **Versão:** 1.0.1
- **Domínio:** Tecnologia
- **Responsável:** Rogerio J. Gentil
- **Data:** 2026-11-13

## Decisão (Y-statement)
No contexto do **MVP do Ondescartar, construído como monólito modular ([ADR-001](ADR-001-estilo-arquitetural.md))**,
diante da necessidade de **uma interface web mobile first e de uma única base de código com camadas bem separadas**,
decidimos por **Next.js com TypeScript, usando React nas telas**,
e não **NestJS com front-end separado ou Spring Boot**,
para alcançar **usabilidade (mobile first), desempenho, manutenibilidade e testabilidade, respeitando as restrições de custo próximo de zero, de CI com GitHub Actions e de familiaridade da equipe com Java e TypeScript**,
aceitando que **a separação entre camadas não é imposta pelo framework e depende de convenções de pastas e de fitness functions**.

## Atributos de qualidade e restrições relacionados
- **Usabilidade e desempenho:** renderização no servidor e boa experiência em rede móvel.
- **Manutenibilidade, testabilidade e evolutividade:** tipagem estática e lógica de negócio em módulos TypeScript independentes de React.
- **Restrição de negócio, custo próximo de zero:** ecossistema amplo e opções de hospedagem gratuitas ou baratas.
- **Restrição de negócio, GitHub e CI com GitHub Actions:** ferramentas de teste, lint e build bem suportadas.
- **Restrição de equipe, familiaridade com Java e TypeScript:** o desenvolvimento fica em linguagens de tipagem estática conhecidas pela pessoa responsável.

## Consequências

### Benefícios
- Uma única linguagem no front-end e no back-end, e uma única base de código.
- Ecossistema grande, com bom suporte a mapas (por exemplo, Leaflet, para a versão futura com mapa) e a ferramentas de verificação de arquitetura.
- Tipagem estática, que ajuda a manter as camadas coerentes.

### Custos e riscos
- O framework não impõe a separação em camadas.
  - Mitigação: estrutura de pastas por camada e fitness functions no CI.
- Dependência do ecossistema Next.js, que evolui rápido.
  - Mitigação: manter a lógica de negócio fora do framework, o que reduz o custo de trocar ou atualizar.

### Alternativas descartadas
- **NestJS com front-end separado:** exige duas aplicações no MVP, descartado pela complexidade e pelo custo. Segue como possível evolução.
- **Spring Boot (Java):** camadas muito explícitas e linguagem conhecida, mas mais trabalhoso para um MVP.

## Referências
- [ADR-001: Estilo arquitetural da aplicação](ADR-001-estilo-arquitetural.md)
