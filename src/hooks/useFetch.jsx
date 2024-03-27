import { useState, useEffect } from "react";

export const useFetch = (searchTerm, searchType) => {
    const mealsBaseUrl = 'https://www.themealdb.com/api/json/v1/1/search.php';
    const cocktailBaseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

    const [data, setData] = useState(null);
    const [dataListTitle, setDataListTitle] = useState('');
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async (baseUrl, queryParam, queryParamValue) => {
          try {
            setIsPending(true);
            const url = `${baseUrl}?${queryParam}=${queryParamValue}`;
            const response = await fetch(url);
            if (response.ok) {
                const jsonData = await response.json();
                if (queryParamValue === '') {
                  setDataListTitle(`${searchType}`);
                } else {
                  setDataListTitle(`Search Results for "${queryParamValue}" in ${searchType}`);
                }
                setData(formatData(jsonData, searchType));
                setError(null);
            } else {
              throw Error("Could not fetch data");
            }
          } catch (error) {
              setError(error.message);
          } finally {
            setIsPending(false);
          }
        }
    
        const formatData = (uData, type) => {
          const fData = [];
    
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
    
          if (type === 'Meal' && uData.meals !== null) {
            uData.meals.map((item) => {
              let element = {
                id: item.idMeal,
                title: item.strMeal,
                image: item.strMealThumb,
                instructions: item.strInstructions,
                ingMea: getIngredientsAndMeasurements(item)
              };
              fData.push(element);
            });
          } else if (type === 'Cocktail' && uData.drinks !== null) {
            uData.drinks.map((item) => {
              let element = {
                id: item.idDrink,
                title: item.strDrink,
                image: item.strDrinkThumb,
                instructions: item.strInstructions,
                ingMea: getIngredientsAndMeasurements(item)
              };
              fData.push(element);
            });
          }
          return fData;
        }
    
        if (searchType === 'Meal') {
          fetchData(mealsBaseUrl, 's', searchTerm);
        } else {
          fetchData(cocktailBaseUrl, 's', searchTerm);
        }
    
    }, [searchTerm, searchType]);

    return { data, dataListTitle, isPending, error };

}