import { useState, useEffect } from "react";

export const useFetchMeal = (mealId) => {
    const mealBaseUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php';

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
          try {
            setIsPending(true);
            const url = `${mealBaseUrl}?i=${mealId}`;
            const response = await fetch(url);
            if (response.ok) {
              const jsonData = await response.json();
              if (jsonData.meals === null) {
                setData(null);
              } else {
                setData(formatData(jsonData));
              }
              setError(null);
            } else {
              throw Error(`Could not fetch meal by id ${mealId}`);
            }
          } catch (error) {
              setError(error.message);
          } finally {
            setIsPending(false);
          }
        }
    
        const formatData = (uData) => {
          let fData = {};
    
          const getIngredientsAndMeasurements = (item) => {
            let ingredientsAndMeasurements = [];
            for (let i = 0; i < 20; i++) {
              let ingValue = item[`strIngredient${i}`];
              if (ingValue !== null && ingValue !== '' && ingValue !== undefined) {
                let meaValue = item[`strMeasure${i}`];
                ingredientsAndMeasurements.push({ing: ingValue, mea: meaValue});
              }
            }
            return ingredientsAndMeasurements;
          }

          uData.meals.map((item) => {
            let element = {
              id: item.idMeal,
              title: item.strMeal,
              image: item.strMealThumb,
              instructions: item.strInstructions,
              ingMea: getIngredientsAndMeasurements(item)
            };
            fData = element;
          });
          
          return fData;
        }
    
        fetchData();
    
    }, [mealId]);

    return { data, isPending, error };

}