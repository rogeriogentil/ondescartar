import type { PontoDescarte } from "../../dominio/ponto-descarte";

/** Porta de saída: acesso aos pontos de descarte armazenados. */
export interface RepositorioPontosDescarte {
  /** Lista os pontos que aceitam algum item cujo nome contém o termo. */
  listarPorItem(termo: string): Promise<PontoDescarte[]>;
}
