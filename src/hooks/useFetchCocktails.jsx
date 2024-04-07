import { useState, useEffect } from "react";

export const useFetchCocktails = (searchTerm) => {
    const mealsBaseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

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
                if (jsonData.drinks === null) {
                    setDataListTitle(`No cocktails found for "${searchTerm}"`);
                    setData([]);
                } else {
                  if (searchTerm === '') {
                    setDataListTitle('');
                  } else {
                    let postfix = jsonData.drinks.length === 1 ? '' : 's';
                    setDataListTitle(`${jsonData.drinks.length} cocktail${postfix} found for "${searchTerm}"`);
                  }
                  setData(formatData(jsonData));
                }
                setError(null);
            } else {
              throw Error(`Could not fetch cocktails for ${searchTerm}`);
            }
          } catch (error) {
            console.log(error);
            setError(error.message);
          } finally {
            setIsPending(false);
          }
        }
    
        const formatData = (uData) => {
          const fData = [];
          
          uData.drinks.map((item) => {
            let element = {
              id: item.idDrink,
              title: item.strDrink,
              image: item.strDrinkThumb
            };
            fData.push(element);
          });
          
          return fData;
        }
    
        fetchData();
    
    }, [searchTerm]);

    return { data, dataListTitle, isPending, error };

}