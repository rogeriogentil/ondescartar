import {
  normalizarTexto,
  TAMANHO_MINIMO_TERMO,
} from "../dominio/ponto-descarte";
import type { GeradorLinkMapa } from "./portas/gerador-link-mapa";
import type { RepositorioPontosDescarte } from "./portas/repositorio-pontos-descarte";

/** Ponto de descarte como devolvido pela busca, pronto para ser exibido. */
export type PontoEncontrado = {
  readonly id: string;
  readonly nome: string;
  readonly endereco: string;
  readonly horario: string;
  readonly observacoes?: string;
  readonly itensAceitos: readonly string[];
  readonly linkMapa: string;
};

export type DependenciasBuscarPontosPorItem = {
  readonly repositorio: RepositorioPontosDescarte;
  readonly geradorLinkMapa: GeradorLinkMapa;
};

export type BuscarPontosPorItem = (termo: string) => Promise<PontoEncontrado[]>;

/**
 * Caso de uso (porta de entrada): busca os pontos que aceitam um item.
 *
 * Recebe as portas de saída e devolve a função que executa a busca. Termos
 * vazios ou curtos demais devolvem uma lista vazia, sem consultar o repositório.
 * O resultado vem em ordem alfabética de nome, com o link para o site de mapas.
 */
export function buscarPontosPorItem({
  repositorio,
  geradorLinkMapa,
}: DependenciasBuscarPontosPorItem): BuscarPontosPorItem {
  return async (termo) => {
    const termoNormalizado = normalizarTexto(termo);
    if (termoNormalizado.length < TAMANHO_MINIMO_TERMO) {
      return [];
    }

    const pontos = await repositorio.listarPorItem(termoNormalizado);

    return pontos
      .map((ponto) => ({
        id: ponto.id,
        nome: ponto.nome,
        endereco: ponto.endereco,
        horario: ponto.horario,
        observacoes: ponto.observacoes,
        itensAceitos: ponto.itensAceitos,
        linkMapa: geradorLinkMapa.gerar(ponto.localizacao),
      }))
      .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  };
}
