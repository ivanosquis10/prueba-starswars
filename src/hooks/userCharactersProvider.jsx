import { useContext } from 'react'
import { CharactersContext } from '../context/CharacterProvider'

export const useCharactersProvider = () => useContext(CharactersContext)
