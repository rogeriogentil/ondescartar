# Ondescartar

Plataforma web para ajudar moradores de São Carlos (SP) a encontrar onde descartar corretamente itens comuns, como pilhas e baterias, eletrônicos, lâmpadas, óleo de cozinha, medicamentos vencidos, entulho e volumosos, pneus e vidro.

## Status
Esqueleto inicial da aplicação, com o módulo `pontos-descarte` atravessando todas as camadas. Enquanto o banco não existe, a busca usa dados fictícios em memória.

## Visão do MVP
- O usuário escolhe ou digita um item e vê, em uma lista, os locais que o aceitam, com endereço, horário e observações, e um botão "Abrir no mapa" que abre o local em um site de mapas (Google Maps, OpenStreetMap ou Waze).
- O mapa dentro da aplicação fica para uma versão futura.
- Foco em uso pelo celular (mobile first), sem cadastro obrigatório.
- Cobertura inicial limitada a São Carlos.
- O sucesso é medido pelo número de usuários e de buscas.

## Arquitetura
- Monólito modular, com camadas explícitas e código organizado por módulos de domínio, no estilo Portas e Adaptadores.
- Next.js com TypeScript e React.
- PostgreSQL com PostGIS.
- Código no GitHub e integração contínua com GitHub Actions.

Os detalhes e as justificativas estão na documentação abaixo.

## Como rodar
Requer Node.js 22 ou mais recente.

```bash
npm install
npm run dev
```

A aplicação abre em http://localhost:3000. Busque um item, por exemplo `pilhas`, para ver os locais de exemplo.

| Script | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` e `npm start` | build de produção e servidor de produção |
| `npm run lint` | ESLint |
| `npm run lint:arquitetura` | regras de importação do [ADR-004](docs/ADRs/ADR-004-organizacao-diretorios-modulos.md), com o dependency-cruiser |
| `npm run verificar-tipos` | verificação de tipos do TypeScript |
| `npm test` | testes de unidade, com o Vitest (`npm run test:observar` para o modo contínuo) |
| `npm run verificar` | lint, regras de importação, tipos e testes, em sequência |

## Estrutura do código
Organizada por módulos de domínio, com as camadas dentro de cada módulo, como definido no [ADR-004](docs/ADRs/ADR-004-organizacao-diretorios-modulos.md):

```
src/
├── app/                          rotas do Next.js (adaptadores de entrada)
├── modulos/
│   └── pontos-descarte/
│       ├── dominio/              PontoDescarte e regras de comparação de itens
│       ├── aplicacao/            caso de uso buscarPontosPorItem
│       │   └── portas/           RepositorioPontosDescarte e GeradorLinkMapa
│       ├── infraestrutura/
│       │   ├── persistencia/     repositório em memória e dados fictícios
│       │   └── integracao/       link "Abrir no mapa" do OpenStreetMap
│       ├── apresentacao/         formulário de busca e lista de pontos
│       └── index.ts              interface pública do módulo
└── composicao/
    └── pontos-descarte.ts        monta o caso de uso com os adaptadores concretos
banco/                            migrações e dados iniciais (ver banco/README.md)
scripts/                          carga de dados e utilitários
tests/e2e/                        testes de ponta a ponta
```

O ORM e a ferramenta de migração ainda não foram escolhidos.

## Documentação
- [Requisitos arquiteturais](docs/requisitos-arquiteturais.md): atributos de qualidade, restrições de negócio e princípios de arquitetura.
- [Registro de decisões de arquitetura (ADRs)](docs/ADRs/README.md): decisões organizadas pelos domínios BDAT do TOGAF.
- [Convenções do projeto](docs/convencoes/README.md): versionamento, código e outras regras práticas.

## Licença
O código deste repositório é distribuído sob a licença [MIT](LICENSE).

## Responsável
Rogerio J. Gentil
