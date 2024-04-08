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
                    <div className="meal-detail-intro">
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
