export const getCharacters = async page => {
  try {
    const url = `https://swapi.dev/api/people/?page=${page}`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error('Ha habido un problema')
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}
