import { useState } from 'react';
import './Searchbar.css';

export const Searchbar = ({onSearchPressed}) => {
    
    const [searchTerm, setSearchTerm] = useState('');

    const onSubmitSearch = (e) => {
        e.preventDefault();

        onSearchPressed(searchTerm);
    }

    return (
        <form onSubmit={ onSubmitSearch }>
            <div className='search-bar'>
                <input type="text" placeholder="Search here.." 
                    value={ searchTerm } onChange={ e => setSearchTerm(e.target.value) } />
                <button>Search</button>
            </div>
        </form>
    )
}
