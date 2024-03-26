import './App.css'
import { Home } from './components/Home'
import { Navbar } from './components/Navbar'

function App() {

  return (
    <>
      <div className='app'>
        <Navbar />
        <div className='container'>
          <Home />
        </div>
      </div>
    </>
  )
}

export default App
