import { describe, expect, it } from "vitest";
import { aceitaItem, normalizarTexto, type PontoDescarte } from "./ponto-descarte";

const ponto: PontoDescarte = {
  id: "1",
  nome: "Ponto de exemplo",
  endereco: "Rua de Exemplo, 100",
  localizacao: { latitude: -22.0175, longitude: -47.8909 },
  horario: "Segunda a sexta, das 8h às 17h",
  itensAceitos: ["Pilhas e baterias", "Lâmpadas"],
};

describe("normalizarTexto", () => {
  it("remove acentos, espaços extras e maiúsculas", () => {
    expect(normalizarTexto("  Lâmpadas   Fluorescentes ")).toBe("lampadas fluorescentes");
  });
});

describe("aceitaItem", () => {
  it("aceita o item quando o termo faz parte do nome, sem diferenciar acentos", () => {
    expect(aceitaItem(ponto, "lampada")).toBe(true);
    expect(aceitaItem(ponto, "PILHA")).toBe(true);
  });

  it("não aceita item que o ponto não recebe", () => {
    expect(aceitaItem(ponto, "pneu")).toBe(false);
  });

  it("não aceita termo curto demais", () => {
    expect(aceitaItem(ponto, "p")).toBe(false);
  });
});
