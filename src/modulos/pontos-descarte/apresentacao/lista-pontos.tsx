import type { PontoEncontrado } from "../aplicacao/buscar-pontos-por-item";

type PropriedadesListaPontos = {
  readonly termo: string;
  readonly pontos: readonly PontoEncontrado[];
};

/** Lista os pontos encontrados, cada um com o botão "Abrir no mapa". */
export function ListaPontos({ termo, pontos }: PropriedadesListaPontos) {
  if (pontos.length === 0) {
    return (
      <p className="lista-pontos__vazia">
        Nenhum local encontrado para “{termo}”. Tente outro nome para o item.
      </p>
    );
  }

  return (
    <section aria-label={`Locais que aceitam ${termo}`}>
      <p className="lista-pontos__resumo">
        {pontos.length === 1 ? "1 local aceita" : `${pontos.length} locais aceitam`} “{termo}”
      </p>
      <ul className="lista-pontos">
        {pontos.map((ponto) => (
          <li key={ponto.id} className="lista-pontos__item">
            <h2>{ponto.nome}</h2>
            <p>{ponto.endereco}</p>
            <p>{ponto.horario}</p>
            {ponto.observacoes && <p className="lista-pontos__observacoes">{ponto.observacoes}</p>}
            <p className="lista-pontos__itens">Aceita: {ponto.itensAceitos.join(", ")}</p>
            <a href={ponto.linkMapa} target="_blank" rel="noopener noreferrer">
              Abrir no mapa
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
