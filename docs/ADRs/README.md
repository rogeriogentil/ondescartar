# Registro de decisões de arquitetura (ADRs)

Decisões de arquitetura do Ondescartar, organizadas pelos domínios BDAT do TOGAF: Negócio, Dados, Aplicação e Tecnologia. Os ADRs seguem o formato Y-statement. Os requisitos e restrições que os orientam estão em [Requisitos arquiteturais](../requisitos-arquiteturais.md).

## Negócio
Nenhuma ADR registrada ainda. As decisões de negócio (escopo, métricas de sucesso e restrições) estão em [Requisitos arquiteturais](../requisitos-arquiteturais.md).

## Dados
| ADR | Título | Status | Versão |
|---|---|---|---|
| [ADR-003](ADR-003-persistencia-dados-consultas-geograficas.md) | Persistência de dados e consultas geográficas | proposta | 1.2.0 |

## Aplicação
| ADR | Título | Status | Versão |
|---|---|---|---|
| [ADR-001](ADR-001-estilo-arquitetural.md) | Estilo arquitetural da aplicação | proposta | 1.2.0 |
| [ADR-004](ADR-004-organizacao-diretorios-modulos.md) | Organização de diretórios e módulos do código | proposta | 1.0.0 |

## Tecnologia
| ADR | Título | Status | Versão |
|---|---|---|---|
| [ADR-002](ADR-002-linguagem-framework.md) | Linguagem e framework da aplicação | proposta | 1.1.0 |

## Convenções
- Cada ADR tem status, versão, domínio, responsável e data no cabeçalho.
- O nome do arquivo e o título nomeiam o assunto da decisão, e não a decisão tomada.
- Novas ADRs são acrescentadas na seção do seu domínio principal.
- A versão segue a [convenção de versionamento](../convencoes/versionamento.md#documentos-e-adrs).

## Quando criar uma ADR
Uma decisão vira ADR quando passa por três critérios:
- **Significância:** tem alto impacto, amplo alcance ou risco elevado de reversão?
- **Duradouro:** o contexto da decisão pode ser esquecido e precisa ser preservado?
- **Compensação:** há uma alternativa válida ou rejeitada que precisa ser explicada?

Cada critério recebe de 0 a 2 pontos, num total de até 6:

| Pontos | Significância | Duradouro | Compensação |
|---|---|---|---|
| 0 | Isolada e fácil de trocar | Contexto óbvio ou que muda logo | Sem alternativa real |
| 1 | Afeta um módulo ou camada, com custo moderado de reversão | Vale lembrar por alguns meses | Alternativa com diferença pequena |
| 2 | Afeta vários módulos ou é cara de reverter | Alguém no futuro vai perguntar "por que foi assim?" | Alternativas válidas, com trade-offs a explicar |

Pela soma dos pontos:
- **0 a 2:** não é ADR.
- **3 a 4:** ADR opcional. Na dúvida, uma ADR curta.
- **5 a 6:** ADR obrigatória.

Duas regras valem acima da soma:
- Significância 0 nunca gera ADR.
- Significância 2 sozinha já pede ao menos uma ADR curta.

### O que fica fora de ADR
Estes assuntos vão para o [README](../../README.md) ou para a documentação técnica, e não para uma ADR:
- Escolha de bibliotecas pontuais, sem impacto no sistema.
- Configurações operacionais.
- Parâmetros de ambiente.
- Variáveis de build.

Regras práticas fáceis de mudar ficam nas [convenções do projeto](../convencoes/README.md).
