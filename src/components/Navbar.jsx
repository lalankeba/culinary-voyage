import { NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav>
        <div className="navbar">
            <h1>Culinary Voyage</h1>
            <div className='links'>
              <NavLink to="/">Meals</NavLink>
              <NavLink to="cocktails">Cocktails</NavLink>
            </div>
        </div>
    </nav>
  )
}
