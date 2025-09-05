// import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DrinkCard from "./components/DrinkCard";

type Cocktail = {
  strDrink: string;
  strDrinkThumb: string;
  strAlcoholic: string;
  strTags: string;
};

function Dashboard() {
  const [randomThumb, setRandomThumb] = useState("");
  const [cocktailFields, setCocktailFields] = useState<Cocktail | null>(null);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState<Cocktail[]>([]);

  const handleInputChange = (e) => {
    console.log("e:", e.target.value);
    setSearch(e.target.value);
  };

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    console.log("response:", response.data);
  };

  const getRandom = async () => {
    try {
      const response = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );
      const drink = response.data.drinks[0];
      setCocktailFields(response.data.drinks[0]);
      console.log("random:", drink);
      setRandomThumb(`${drink.strDrinkThumb}/small`);
    } catch (error) {
      console.error("Error fetching random cocktail:", error);
    }
  };

  const searchCocktail = async () => {
    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
      );
      if (response.data.drinks) {
        console.log("search results:", response.data.drinks);
        setSearchList(response.data.drinks);
      } else {
        console.log("No cocktails found for:", search);
      }
    } catch (error) {
      console.error("Error fetching random cocktail:", error);
    }
  };

  useEffect(() => {
    // fetchAPI();
    // getRandom();
  }, []);

  return (
    <>
      <p>hello this is dashboard</p>
      <button onClick={getRandom}>surprise me</button>
      {cocktailFields?.strDrinkThumb && (
        <DrinkCard
          name={cocktailFields?.strDrink ?? ""}
          image={`${cocktailFields?.strDrinkThumb}/small`}
          alcoholic={cocktailFields?.strAlcoholic ?? ""}
          //   tags={cocktailFields?.strTags ?? ""}
        />
      )}{" "}
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="search for cocktail"
          className="flex-grow p-2 focus:outline-none"
          value={search}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 text-white p-2 px-4 hover:bg-blue-600 focus:outline-none"
          onClick={searchCocktail}
        >
          Search
        </button>
      </div>
      {searchList &&
        searchList.map((cocktail) => (
          <DrinkCard
            name={cocktail?.strDrink ?? ""}
            image={`${cocktail?.strDrinkThumb}/small`}
            alcoholic={cocktail?.strAlcoholic ?? ""}
            //   tags={cocktailFields?.strTags ?? ""}
          />
        ))}{" "}
    </>
  );
}

export default Dashboard;
