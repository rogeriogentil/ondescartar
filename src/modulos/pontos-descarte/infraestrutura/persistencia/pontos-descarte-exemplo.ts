import type { PontoDescarte } from "../../dominio/ponto-descarte";

/**
 * Pontos FICTÍCIOS, só para desenvolvimento enquanto o banco não existe.
 * Nomes, endereços e horários não correspondem a locais reais e não devem ser
 * exibidos em produção. Os dados reais ficarão em `banco/dados-iniciais/`.
 */
export const pontosDescarteExemplo: readonly PontoDescarte[] = [
  {
    id: "exemplo-ecoponto",
    nome: "Ecoponto de exemplo",
    endereco: "Rua Fictícia, 100, Centro, São Carlos (SP)",
    localizacao: { latitude: -22.0175, longitude: -47.8909 },
    horario: "Segunda a sábado, das 8h às 17h",
    observacoes: "Dado fictício para desenvolvimento.",
    itensAceitos: ["Entulho e volumosos", "Pneus", "Vidro", "Óleo de cozinha"],
  },
  {
    id: "exemplo-farmacia",
    nome: "Farmácia de exemplo",
    endereco: "Avenida Fictícia, 200, Centro, São Carlos (SP)",
    localizacao: { latitude: -22.0087, longitude: -47.8976 },
    horario: "Todos os dias, das 7h às 22h",
    observacoes: "Dado fictício para desenvolvimento. Entregar no balcão.",
    itensAceitos: ["Medicamentos vencidos", "Pilhas e baterias"],
  },
  {
    id: "exemplo-loja",
    nome: "Loja de eletrônicos de exemplo",
    endereco: "Rua Imaginária, 300, Vila Exemplo, São Carlos (SP)",
    localizacao: { latitude: -22.0219, longitude: -47.8851 },
    horario: "Segunda a sexta, das 9h às 18h",
    observacoes: "Dado fictício para desenvolvimento.",
    itensAceitos: ["Eletrônicos", "Pilhas e baterias", "Lâmpadas"],
  },
];
