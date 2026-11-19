type PropriedadesFormularioBusca = {
  readonly termoInicial?: string;
};

/** Formulário de busca por item. Funciona sem JavaScript, enviando `?item=` por GET. */
export function FormularioBusca({ termoInicial = "" }: PropriedadesFormularioBusca) {
  return (
    <form className="formulario-busca" action="/" method="get" role="search">
      <label htmlFor="item">O que você quer descartar?</label>
      <div className="formulario-busca__campos">
        <input
          id="item"
          name="item"
          type="search"
          defaultValue={termoInicial}
          placeholder="Ex.: pilhas, lâmpadas, óleo de cozinha"
          autoComplete="off"
          required
          minLength={2}
        />
        <button type="submit">Buscar</button>
      </div>
    </form>
  );
}
