import normalizarTexto from "./normalizarTexto"

const include = (textoGeneral, textoIncluido) => {
  return normalizarTexto(textoGeneral).includes(normalizarTexto(textoIncluido));
}

export default include;