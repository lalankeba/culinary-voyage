import { useState, useEffect } from "react";

export const useFetchCocktail = (drinkId) => {
    const cocktailBaseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php';

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
          try {
            setIsPending(true);
            const url = `${cocktailBaseUrl}?i=${drinkId}`;
            const response = await fetch(url);
            if (response.ok) {
              const jsonData = await response.json();
              if (jsonData.drinks === null) {
                setData(null);
              } else {
                setData(formatData(jsonData));
              }
              setError(null);
            } else {
              throw Error(`Could not fetch cocktail by id ${drinkId}`);
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

          uData.drinks.map((item) => {
            let element = {
              id: item.idDrink,
              title: item.strDrink,
              image: item.strDrinkThumb,
              instructions: item.strInstructions,
              ingMea: getIngredientsAndMeasurements(item)
            };
            fData = element;
          });
          
          return fData;
        }
    
        fetchData();
    
    }, [drinkId]);

    return { data, isPending, error };

}