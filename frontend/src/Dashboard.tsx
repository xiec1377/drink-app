// import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [randomThumb, setRandomThumb] = useState("");
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
      console.log("random:", drink);
      setRandomThumb(`${drink.strDrinkThumb}/medium`);
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
      <p onClick={getRandom}>surprise me</p>

      {randomThumb && (
        <div>
          <img src={randomThumb} alt="Random cocktail" />
        </div>
      )}
    </>
  );
}

export default Dashboard;
