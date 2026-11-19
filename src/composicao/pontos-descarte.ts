// Raiz de composição do módulo pontos-descarte: monta os casos de uso com os
// adaptadores concretos (ADR-004). Enquanto o banco não existe, o repositório
// é o em memória, com dados fictícios.
import { buscarPontosPorItem } from "@/modulos/pontos-descarte";
import { GeradorLinkMapaOpenStreetMap } from "@/modulos/pontos-descarte/infraestrutura/integracao/gerador-link-mapa-open-street-map";
import { pontosDescarteExemplo } from "@/modulos/pontos-descarte/infraestrutura/persistencia/pontos-descarte-exemplo";
import { RepositorioPontosDescarteEmMemoria } from "@/modulos/pontos-descarte/infraestrutura/persistencia/repositorio-pontos-descarte-em-memoria";

const repositorio = new RepositorioPontosDescarteEmMemoria(pontosDescarteExemplo);
const geradorLinkMapa = new GeradorLinkMapaOpenStreetMap();

export const pontosDescarte = {
  buscarPontosPorItem: buscarPontosPorItem({ repositorio, geradorLinkMapa }),
};
