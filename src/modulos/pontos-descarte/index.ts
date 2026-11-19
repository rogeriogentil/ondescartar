// Interface pública do módulo pontos-descarte. Outros módulos e a pasta app/
// importam só daqui (ADR-004).
export type { Coordenadas, PontoDescarte } from "./dominio/ponto-descarte";
export {
  buscarPontosPorItem,
  type BuscarPontosPorItem,
  type PontoEncontrado,
} from "./aplicacao/buscar-pontos-por-item";
export type { GeradorLinkMapa } from "./aplicacao/portas/gerador-link-mapa";
export type { RepositorioPontosDescarte } from "./aplicacao/portas/repositorio-pontos-descarte";
export { FormularioBusca } from "./apresentacao/formulario-busca";
export { ListaPontos } from "./apresentacao/lista-pontos";
