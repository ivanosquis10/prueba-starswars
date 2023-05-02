import { useRef, useState } from 'react'
import { useCharactersProvider } from './hooks/userCharactersProvider'

const App = () => {
  const {
    characters,
    characterDetail,
    setCharacterDetail,
    loading,
    page,
    setPage,
    getCharacter,
    characterSearch,
  } = useCharactersProvider()

  const inputRef = useRef(null)
  const [inputSearch, setInputSearch] = useState('')

  const showDetails = async character => {
    // Se puede pasar la informacion directamente y mostrarla

    // tambien se puede hacer otra llamada a la api pero con el id especifico del personaje
    // const urlCharacter = character.url.split('/')[5] // esta es una forma
    const id = Number(character.url.split('/').slice(-2)[0]) // esta es otra forma de hacerlo
    await getCharacter(id)
  }

  const handleChange = () => {
    const search = inputRef.current.value
    setInputSearch(search)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (inputSearch === '' || inputSearch.length <= 2)
      return alert('campo obligatorio')

    inputRef.current.value = ''
    setCharacterDetail({})

    await characterSearch(inputSearch)
  }

  const handleChangePage = pagina => {
    if (!characters.previous && page + pagina <= 0) return
    if (characters.next && page + pagina >= 10) return

    setPage(page + pagina)
  }

  return (
    <main className='container'>
      <form onSubmit={handleSubmit} className='form'>
        <label htmlFor=''>Find a characters</label>
        <input
          ref={inputRef}
          onChange={handleChange}
          type='text'
          placeholder='Luke Skywalker, Darth Vader, etc'
        />
      </form>

      <section>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          characters?.results?.map(character => (
            <div key={character.name}>
              <h3 onClick={() => showDetails(character)}>{character.name}</h3>
            </div>
          ))
        )}
      </section>

      <section>
        {characterDetail && (
          <>
            <h2>
              {!characterDetail.name
                ? 'Detalles del Personaje'
                : characterDetail.name}
            </h2>
            <ul>
              <li>nombre: {characterDetail.name}</li>
              <li>año: {characterDetail.birth_year}</li>
              <li>genero: {characterDetail.name}</li>
            </ul>
            <button onClick={() => setCharacterDetail({})}>
              Borrar personaje
            </button>
          </>
        )}
      </section>

      <section className='buttons'>
        <button onClick={() => handleChangePage(-1)}>prev</button>
        {page}
        <button onClick={() => handleChangePage(+1)}>next</button>
      </section>
    </main>
  )
}

export default App
