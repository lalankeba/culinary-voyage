import { useState } from "react";
import { useFetchMeals } from "../hooks/useFetchMeals";
import { Searchbar } from "../components/Searchbar";
import { useNavigate } from "react-router-dom";
import './Meals.css';

export const Meals = () => {

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');

    const { data, dataListTitle, isPending, error } = useFetchMeals(searchTerm);

    const onSearchPressed = (sTerm) => {
        setSearchTerm(sTerm);
    }

    return (
        <div className="meals">
          <section>
            <h2>Meals</h2>
            <Searchbar onSearchPressed={onSearchPressed} />
          </section>
          <section>
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { dataListTitle && <div><i>{ dataListTitle }</i></div> }
            <div className="meal-previews">
            { data && 
            data.map((item) => (
                <div className="meal-preview" key={item.id} onClick={() => navigate(`/meals/${item.id}`)}>
                    <img src={item.image} alt={item.title} />
                    <h4>{ item.title }</h4>
                </div>
            ))}
            </div>
          </section>
        </div>
    )
}
