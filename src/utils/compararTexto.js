import normalizarTexto from "./normalizarTexto"

const match = (textoA, textoB) => {
  return normalizarTexto(textoA) === normalizarTexto(textoB);
}

export default match;