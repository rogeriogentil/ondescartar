import type { GeradorLinkMapa } from "../../aplicacao/portas/gerador-link-mapa";
import type { Coordenadas } from "../../dominio/ponto-descarte";

const ZOOM = 18;

/** Adaptador de saída que gera o link do local no OpenStreetMap. */
export class GeradorLinkMapaOpenStreetMap implements GeradorLinkMapa {
  gerar({ latitude, longitude }: Coordenadas): string {
    const parametros = new URLSearchParams({
      mlat: String(latitude),
      mlon: String(longitude),
    });
    return `https://www.openstreetmap.org/?${parametros}#map=${ZOOM}/${latitude}/${longitude}`;
  }
}
