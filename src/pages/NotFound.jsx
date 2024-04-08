import { Link } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className='not-found'>
        <h2>404</h2>
        <h3>This page is not available</h3>
        <p>The requested resource may have been removed.</p>
        <Link to={"/"}>Go back to home</Link>
    </div>
  )
}
