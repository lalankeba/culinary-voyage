import { useState, useEffect } from "react";

export const useFetchMeals = (searchTerm) => {
    const mealsBaseUrl = 'https://www.themealdb.com/api/json/v1/1/search.php';

    const [data, setData] = useState(null);
    const [dataListTitle, setDataListTitle] = useState('');
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
          try {
            setIsPending(true);
            setDataListTitle('');
            setData(null);
            const url = `${mealsBaseUrl}?s=${searchTerm}`;
            const response = await fetch(url);
            if (response.ok) {
                const jsonData = await response.json();
                if (jsonData.meals === null) {
                    setDataListTitle(`No meals found for "${searchTerm}"`);
                    setData([]);
                } else {
                  if (searchTerm === '') {
                    setDataListTitle('');
                  } else {
                    let postfix = jsonData.meals.length === 1 ? '' : 's';
                    setDataListTitle(`${jsonData.meals.length} meal${postfix} found for "${searchTerm}"`);
                  }
                  setData(formatData(jsonData));
                }
                setError(null);
            } else {
              throw Error(`Could not fetch meals for ${searchTerm}`);
            }
          } catch (error) {
            setError(error.message);
          } finally {
            setIsPending(false);
          }
        }
    
        const formatData = (uData) => {
          const fData = [];
          
          uData.meals.map((item) => {
            let element = {
            id: item.idMeal,
            title: item.strMeal,
            image: item.strMealThumb
            };
            fData.push(element);
          });
          
          return fData;
        }
    
        fetchData();
    
    }, [searchTerm]);

    return { data, dataListTitle, isPending, error };

}