# Requisitos arquiteturais

## Contexto
Ondescartar é uma plataforma web para moradores de São Carlos (SP) encontrarem onde descartar corretamente itens comuns: pilhas e baterias, eletrônicos, lâmpadas, óleo de cozinha, medicamentos vencidos, entulho e volumosos, pneus e vidro. O sucesso inicial é medido pelo número de usuários e de buscas.

## Atributos de qualidade (em ordem de prioridade)
1. **Confiabilidade.** Dados corretos e atualizados dos pontos de descarte (o maior risco do produto) e disponibilidade do serviço. A confiabilidade dos dados pesa mais que a disponibilidade no MVP.
2. **Usabilidade.** Mobile first: buscar um item e ver os locais que o aceitam em poucos toques.
3. **Segurança e privacidade.** Desde o início, em conformidade com a LGPD: sem cadastro obrigatório e sem coletar dados pessoais ou localização exata sem necessidade.
4. **Desempenho.** Buscas e carregamento de páginas rápidos em rede móvel.
5. **Observabilidade.** Medir usuários, buscas e falhas, para evoluir o produto e responder à confiabilidade.
6. **Manutenibilidade, testabilidade e evolutividade.** Camadas separadas, regras de negócio testáveis de forma isolada e possibilidade de trocar peças (mapa, hospedagem) ou separar front e back no futuro.

## Restrições de negócio
- Custo próximo de zero no MVP.
- Código no GitHub e integração contínua com GitHub Actions.
- Cobertura inicial limitada a São Carlos.

## Uso deste documento
Cada ADR registra o atributo de qualidade ou a restrição que justifica a decisão.
