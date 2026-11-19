/** Latitude e longitude em graus decimais (WGS 84). */
export type Coordenadas = {
  readonly latitude: number;
  readonly longitude: number;
};

/** Local que recebe itens para descarte adequado. */
export type PontoDescarte = {
  readonly id: string;
  readonly nome: string;
  readonly endereco: string;
  readonly localizacao: Coordenadas;
  /** Horário de funcionamento em texto livre, como informado pelo local. */
  readonly horario: string;
  readonly observacoes?: string;
  /** Nomes dos itens aceitos, como exibidos ao usuário (por exemplo, "Pilhas e baterias"). */
  readonly itensAceitos: readonly string[];
};

/** Tamanho mínimo do termo de busca, depois de normalizado. */
export const TAMANHO_MINIMO_TERMO = 2;

/**
 * Normaliza um texto para comparação: sem acentos, em minúsculas e sem
 * espaços sobrando. Assim, "Lâmpada" e "lampada" são equivalentes.
 */
export function normalizarTexto(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Indica se o ponto aceita algum item cujo nome contém o termo informado. */
export function aceitaItem(ponto: PontoDescarte, termo: string): boolean {
  const termoNormalizado = normalizarTexto(termo);
  if (termoNormalizado.length < TAMANHO_MINIMO_TERMO) {
    return false;
  }
  return ponto.itensAceitos.some((item) =>
    normalizarTexto(item).includes(termoNormalizado),
  );
}
