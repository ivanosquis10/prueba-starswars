import { createContext, useEffect, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const CharactersContext = createContext()

// eslint-disable-next-line react/prop-types
const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([])
  const [characterDetail, setCharacterDetail] = useState({})
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)

  const getCharacters = async page => {
    try {
      setLoading(true)
      const url = `https://swapi.dev/api/people/?page=${page}`
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error('Ha habido un problema')
      }
      const data = await res.json()
      setCharacters(data)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCharacters(page)
  }, [page])

  const getCharacter = async (id = 0) => {
    try {
      // setLoading(true)
      const url = `https://swapi.dev/api/people/${id}`
      if (id <= 0) return
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error('Ha habido un problema')
      }
      const data = await res.json()
      setCharacterDetail(data)
    } catch (error) {
      console.log(error)
      throw new Error(error)
    }
  }

  const characterSearch = async search => {
    try {
      const API_SEARCH = `https://swapi.dev/api/people/?search=${search}`
      // setLoading(true)
      const res = await fetch(API_SEARCH)
      const data = await res.json()

      setCharacters(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CharactersContext.Provider
      value={{
        characters,
        setCharacters,
        characterDetail,
        setCharacterDetail,
        loading,
        getCharacters,
        page,
        setPage,
        getCharacter,
        characterSearch,
      }}
    >
      {children}
    </CharactersContext.Provider>
  )
}
export { CharactersProvider }
