import { BrowserRouter } from 'react-router-dom'
import Routes from '../components/Routes'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <main className="App">
        <Routes />
      </main>
    </BrowserRouter>
  )
}

export default App
