// import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DrinkCard from "./components/DrinkCard";
import Searchbar from "./Searchbar";
import type { Cocktail } from "./types/cocktail";


function Dashboard() {
  const [cocktailFields, setCocktailFields] = useState<Cocktail | null>(null);

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
      <Searchbar />
    </>
  );
}

export default Dashboard;
