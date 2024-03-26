import { useState } from 'react';
import './Searchbar.css';

export const Searchbar = ({onSearchPressed}) => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('Meal');

    const onSubmitSearch = (e) => {
        e.preventDefault();

        onSearchPressed(searchTerm, searchType);
    }

    return (
        <div className='search-bar'>
            <form onSubmit={ onSubmitSearch }>
                <input type="text" placeholder="Type meal or cocktail" 
                    value={ searchTerm } onChange={ e => setSearchTerm(e.target.value) } />
                <select value={ searchType } onChange={ e => setSearchType(e.target.value) }>
                    <option value="Meal">Meal</option>
                    <option value="Cocktail">Cocktail</option>
                </select>
                <button>Search</button>
            </form>
        </div>
    )
}
