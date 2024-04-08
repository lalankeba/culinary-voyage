import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav>
        <div className="navbar">
            <h1><Link to="/">Culinary Voyage</Link></h1>
            <div className='links'>
              <NavLink to="/meals">Meals</NavLink>
              <NavLink to="cocktails">Cocktails</NavLink>
            </div>
        </div>
    </nav>
  )
}
