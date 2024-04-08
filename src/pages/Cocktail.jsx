import { useParams } from "react-router-dom";
import { useFetchCocktail } from "../hooks/useFetchCocktail";
import './Cocktail.css';

export const Cocktail = () => {

    const {id} = useParams();

    const { data, isPending, error } = useFetchCocktail(id);

    return (
        <div className="cocktail">
            <section>
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { data && 
                <div className="cocktail-detail">
                    <div className="cocktail-detail-intro">
                        <img src={data.image} alt={data.title} />
                        <h4>{ data.title }</h4>
                    </div>
                    <p>{ data.instructions }</p>
                    <h5>Ingredients</h5>
                    <ul>
                    { data.ingMea.map((ingMeaItem) => (
                        <li key={ingMeaItem.ing + ingMeaItem.mea}>{ ingMeaItem.ing }: { ingMeaItem.mea }</li>
                    )) }
                    </ul>
                </div>
            }
            </section>
        </div>
    )
}
