import { useState } from "react";
import { Searchbar } from "./Searchbar";
import { FoodList } from "./FoodList";
import { useFetch } from "../hooks/useFetch";

export const Home = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('Meal');

  const { data, dataListTitle, isPending, error } = useFetch(searchTerm, searchType);

  const onSearchPressed = (sTerm, sType) => {
    setSearchTerm(sTerm);
    setSearchType(sType);
  }

  return (
    <div className="home">
      <Searchbar onSearchPressed={onSearchPressed} />
      { error && <div>{ error }</div> }
      { isPending && <div>Loading...</div> }
      { data && <FoodList food={data} title={dataListTitle} /> }
    </div>
  )
}
