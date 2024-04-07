import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cocktails } from './pages/Cocktails';
import { Meals } from './pages/Meals';
import { Meal } from './pages/Meal';
import { Cocktail } from './pages/Cocktail';

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='app'>
          <header>
            <Navbar />
          </header>
          <main>
            <div className='container'>
              <Routes>
                <Route index element={ <Meals /> } />
                <Route path='meals' element={ <Meals /> } />
                <Route path='cocktails' element={ <Cocktails /> } />
                <Route path='meal/:id' element={ <Meal /> } />
                <Route path='cocktail/:id' element={ <Cocktail /> } />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
