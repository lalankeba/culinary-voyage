import { useState } from "react";
import { useFetchCocktails } from "../hooks/useFetchCocktails";
import { Searchbar } from "../components/Searchbar";
import { useNavigate } from "react-router-dom";
import './Cocktails.css';

export const Cocktails = () => {

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');

    const { data, dataListTitle, isPending, error } = useFetchCocktails(searchTerm);

    const onSearchPressed = (sTerm) => {
        setSearchTerm(sTerm);
    }

    return (
        <div className="cocktails">
          <section>
            <h2>Cocktails</h2>
            <Searchbar onSearchPressed={onSearchPressed} />
          </section>
          <section>
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { dataListTitle && <div><i>{ dataListTitle }</i></div> }
            <div className="cocktail-previews">
            { data && 
            data.map((item) => (
                <div className="cocktail-preview" key={item.id} onClick={() => navigate(`/cocktail/${item.id}`)}>
                    <img src={item.image} alt={item.title} />
                    <h4>{ item.title }</h4>
                </div>
            ))}
            </div>
          </section>
        </div>
    )
}
