# Ondescartar

Plataforma web para ajudar moradores de São Carlos (SP) a encontrar onde descartar corretamente itens comuns, como pilhas e baterias, eletrônicos, lâmpadas, óleo de cozinha, medicamentos vencidos, entulho e volumosos, pneus e vidro.

## Status
Em fase de definição da arquitetura. Ainda não há código da aplicação.

## Visão do MVP
- O usuário escolhe ou digita um item e vê, em um mapa e em uma lista, os locais que o aceitam, com endereço, horário e observações.
- Foco em uso pelo celular (mobile first), sem cadastro obrigatório.
- Cobertura inicial limitada a São Carlos.
- O sucesso é medido pelo número de usuários e de buscas.

## Arquitetura
- Monólito modular, com camadas explícitas.
- Next.js com TypeScript e React.
- PostgreSQL com PostGIS.
- Código no GitHub e integração contínua com GitHub Actions.

Os detalhes e as justificativas estão na documentação abaixo.

## Documentação
- [Requisitos arquiteturais](docs/requisitos-arquiteturais.md): atributos de qualidade, restrições de negócio e princípios de arquitetura.
- [Registro de decisões de arquitetura (ADRs)](docs/ADRs/README.md): decisões organizadas pelos domínios BDAT do TOGAF.

## Responsável
Rogerio J. Gentil
