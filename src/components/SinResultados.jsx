const SinResultados = ({lista}) => {
  return(
    <div>
      {!lista.length ? (
        <h1 className="text-center text-2xl mt-8 text-gray-500">No hay resultados para tu búsqueda</h1>
      ) : (
        ""
      )}
    </div>
  )
}

export default SinResultados;
