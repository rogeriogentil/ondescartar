// Página inicial: faz o papel de controller (adaptador de entrada). Lê o termo
// da URL, chama o caso de uso já montado em composicao/ e entrega o resultado
// aos componentes do módulo (ADR-004).
import { Suspense } from "react";
import { pontosDescarte } from "@/composicao/pontos-descarte";
import { FormularioBusca, ListaPontos } from "@/modulos/pontos-descarte";

export default function Pagina({ searchParams }: PageProps<"/">) {
  return (
    <main className="pagina">
      <header>
        <h1>Ondescartar</h1>
        <p>Encontre onde descartar corretamente seus itens em São Carlos (SP).</p>
      </header>
      <Suspense fallback={<FormularioBusca />}>
        <Busca searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function Busca({ searchParams }: Pick<PageProps<"/">, "searchParams">) {
  const { item } = await searchParams;
  const termo = (Array.isArray(item) ? item[0] : item)?.trim() ?? "";

  if (!termo) {
    return <FormularioBusca />;
  }

  const pontos = await pontosDescarte.buscarPontosPorItem(termo);

  return (
    <>
      <FormularioBusca termoInicial={termo} />
      <ListaPontos termo={termo} pontos={pontos} />
    </>
  );
}
