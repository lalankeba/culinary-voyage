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
                    <div className="cocktail-detail-heading">
                        <img src={data.image} alt={data.title} />
                        <div>
                            <h2>{ data.title }</h2>
                            <p>Category: <i>{ data.category }</i></p>
                            <p>Glass: <i>{ data.glass }</i></p>
                            { data.tags.length !== 0 && 
                            <p>Tags: 
                            { data.tags.map((tag) => (
                                <span key={tag} className="cocktail-tag">{ tag }</span>
                            )) }
                            </p>
                            }
                        </div>
                    </div>
                    <div className="meal-detail-body">
                        <p>{ data.instructions }</p>
                        <h5>Ingredients</h5>
                        <ul>
                        { data.ingMea.map((ingMeaItem) => (
                            <li key={ingMeaItem.ing + ingMeaItem.mea}>{ ingMeaItem.ing }: { ingMeaItem.mea }</li>
                        )) }
                        </ul>
                    </div>
                </div>
            }
            </section>
        </div>
    )
}
