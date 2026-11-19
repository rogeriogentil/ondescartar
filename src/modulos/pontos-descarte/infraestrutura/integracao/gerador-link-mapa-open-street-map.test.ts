import { describe, expect, it } from "vitest";
import { GeradorLinkMapaOpenStreetMap } from "./gerador-link-mapa-open-street-map";

describe("GeradorLinkMapaOpenStreetMap", () => {
  it("gera o link com marcador nas coordenadas do local", () => {
    const link = new GeradorLinkMapaOpenStreetMap().gerar({
      latitude: -22.0175,
      longitude: -47.8909,
    });

    expect(link).toBe(
      "https://www.openstreetmap.org/?mlat=-22.0175&mlon=-47.8909#map=18/-22.0175/-47.8909",
    );
  });
});
