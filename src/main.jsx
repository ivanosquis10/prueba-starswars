import ReactDOM from 'react-dom/client'
import { CharactersProvider } from './context/CharacterProvider.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CharactersProvider>
    <App />
  </CharactersProvider>
)
