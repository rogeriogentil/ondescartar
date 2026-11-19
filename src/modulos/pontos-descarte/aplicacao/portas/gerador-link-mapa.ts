import type { Coordenadas } from "../../dominio/ponto-descarte";

/** Porta de saída: gera o link do botão "Abrir no mapa" em um site de mapas. */
export interface GeradorLinkMapa {
  gerar(localizacao: Coordenadas): string;
}
