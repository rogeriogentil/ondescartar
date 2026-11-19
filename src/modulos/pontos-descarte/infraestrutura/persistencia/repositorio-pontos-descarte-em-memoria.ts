import type { RepositorioPontosDescarte } from "../../aplicacao/portas/repositorio-pontos-descarte";
import { aceitaItem, type PontoDescarte } from "../../dominio/ponto-descarte";

/**
 * Adaptador de saída que guarda os pontos em memória. Serve aos testes e ao
 * desenvolvimento enquanto o repositório em banco relacional não existe.
 */
export class RepositorioPontosDescarteEmMemoria implements RepositorioPontosDescarte {
  private readonly pontos: readonly PontoDescarte[];

  constructor(pontos: readonly PontoDescarte[]) {
    this.pontos = [...pontos];
  }

  async listarPorItem(termo: string): Promise<PontoDescarte[]> {
    return this.pontos.filter((ponto) => aceitaItem(ponto, termo));
  }
}
