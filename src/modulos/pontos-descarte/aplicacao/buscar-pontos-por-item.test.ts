import { describe, expect, it, vi } from "vitest";
import type { PontoDescarte } from "../dominio/ponto-descarte";
import { RepositorioPontosDescarteEmMemoria } from "../infraestrutura/persistencia/repositorio-pontos-descarte-em-memoria";
import { buscarPontosPorItem } from "./buscar-pontos-por-item";
import type { GeradorLinkMapa } from "./portas/gerador-link-mapa";

const ecoponto: PontoDescarte = {
  id: "ecoponto",
  nome: "Ecoponto de exemplo",
  endereco: "Rua de Exemplo, 100",
  localizacao: { latitude: -22.01, longitude: -47.89 },
  horario: "Segunda a sábado, das 8h às 17h",
  itensAceitos: ["Entulho", "Lâmpadas", "Pilhas e baterias"],
};

const farmacia: PontoDescarte = {
  id: "farmacia",
  nome: "Farmácia de exemplo",
  endereco: "Avenida de Exemplo, 200",
  localizacao: { latitude: -22.02, longitude: -47.88 },
  horario: "Todos os dias, das 7h às 22h",
  observacoes: "Entregar no balcão.",
  itensAceitos: ["Medicamentos vencidos", "Pilhas e baterias"],
};

const geradorLinkMapa: GeradorLinkMapa = {
  gerar: ({ latitude, longitude }) => `mapa://${latitude},${longitude}`,
};

function criarBusca(pontos: PontoDescarte[] = [farmacia, ecoponto]) {
  const repositorio = new RepositorioPontosDescarteEmMemoria(pontos);
  return { repositorio, buscar: buscarPontosPorItem({ repositorio, geradorLinkMapa }) };
}

describe("buscarPontosPorItem", () => {
  it("devolve os pontos que aceitam o item, em ordem alfabética e com o link do mapa", async () => {
    const { buscar } = criarBusca();

    const resultado = await buscar("pilhas");

    expect(resultado.map((ponto) => ponto.nome)).toEqual([
      "Ecoponto de exemplo",
      "Farmácia de exemplo",
    ]);
    expect(resultado[1]).toMatchObject({
      endereco: "Avenida de Exemplo, 200",
      observacoes: "Entregar no balcão.",
      linkMapa: "mapa://-22.02,-47.88",
    });
  });

  it("encontra o item sem diferenciar acentos nem maiúsculas", async () => {
    const { buscar } = criarBusca();

    const resultado = await buscar("  LAMPADA ");

    expect(resultado.map((ponto) => ponto.id)).toEqual(["ecoponto"]);
  });

  it("devolve lista vazia quando nenhum ponto aceita o item", async () => {
    const { buscar } = criarBusca();

    expect(await buscar("pneu")).toEqual([]);
  });

  it("não consulta o repositório quando o termo é curto demais", async () => {
    const { repositorio, buscar } = criarBusca();
    const listarPorItem = vi.spyOn(repositorio, "listarPorItem");

    expect(await buscar(" a ")).toEqual([]);
    expect(listarPorItem).not.toHaveBeenCalled();
  });
});
