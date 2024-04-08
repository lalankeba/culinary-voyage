import { useParams } from "react-router-dom";
import { useFetchMeal } from "../hooks/useFetchMeal";
import './Meal.css';

export const Meal = () => {

    const {id} = useParams();

    const { data, isPending, error } = useFetchMeal(id);

    return (
        <div className="meal">
            <section>
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { data && 
                <div className="meal-detail">
                    <div className="meal-detail-heading">
                        <img src={data.image} alt={data.title} />
                        <div>
                            <h2>{ data.title }</h2>
                            <p>Category: <i>{ data.category }</i></p>
                            <p>Area: <i>{ data.area }</i></p>
                            { data.tags.length !== 0 && 
                            <p>Tags: 
                            { data.tags.map((tag) => (
                                <span key={tag} className="meal-tag">{ tag }</span>
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
