import './App.css';
import { Navbar } from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Cocktails } from './pages/Cocktails';
import { Meals } from './pages/Meals';
import { Meal } from './pages/Meal';
import { Cocktail } from './pages/Cocktail';
import { NotFound } from './pages/NotFound';

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
                <Route path='meals/:id' element={ <Meal /> } />
                <Route path='cocktails/:id' element={ <Cocktail /> } />
                <Route path='*' element={ <NotFound /> } />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
