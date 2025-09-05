import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DrinkCard from "./components/DrinkCard";
import type { Cocktail } from "./types/cocktail";

function Searchbar() {
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState<Cocktail[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [alcoholic, setAlcoholic] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [glasses, setGlasses] = useState<string[]>([]);
  const [openIndex, setOpenIndex] = useState<null>(null);
  const containerRef = useRef(null);


  useEffect(() => {
    // fetchAPI();
    // getRandom();
    fetchFilters();
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
    
  const handleInputChange = (e) => {
    console.log("e:", e.target.value);
    setSearch(e.target.value);
  };

  const fetchFilters = async () => {
    try {
      const [categoryRes, alcoholicRes, ingredientRes, glassRes] = await Promise.all([
        axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`),
          axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list`),
          axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`),
          axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list`)]);

      console.log("categoryres:", categoryRes.data.drinks);
      console.log("alcoholicRes:", alcoholicRes.data.drinks);
      console.log("ingredientRes:", ingredientRes.data.drinks);
      console.log("glassRes:", glassRes.data.drinks);
      setCategories(categoryRes.data.drinks.map((item) => item.strCategory));
      setAlcoholic(alcoholicRes.data.drinks.map((item) => item.strAlcoholic));
      setIngredients(ingredientRes.data.drinks.map((item) => item.strIngredient1));
      setGlasses(glassRes.data.drinks.map((item) => item.strGlass));  
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  const dropdowns = [
    { label: "Categories", items: categories },
    { label: "Alcoholic", items: alcoholic },
    { label: "Ingredients", items: ingredients },
    { label: "Glass", items: glasses },
  ];

  const searchCocktail = async () => {
    try {
      const [searchName, searchIngredient] = await Promise.all([
        axios.get(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
        ),
        axios.get(
          `https:www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`
        ),
      ]);

      const searchNameResults = searchName.data.drinks || [];
      const searchIngredientResults = searchIngredient.data.drinks || [];

      console.log("searchanme:", searchNameResults);
      console.log("searchingredient:", searchIngredientResults);

      // merge results of both searches, removing duplicates
      const mergeCocktails = () => {
        const map = new Map();
        [...searchNameResults, ...searchIngredientResults].forEach((drink) => {
          map.set(drink.idDrink, drink);
        });
        return Array.from(map.values());
      };

      if (mergeCocktails().length > 0) {
        console.log("search results:", mergeCocktails);
        setSearchList(mergeCocktails);
      } else {
        console.log("No cocktails found for:", search);
      }
    } catch (error) {
      console.error("Error fetching random cocktail:", error);
    }
  };
  return (<>
    <div className="flex flex-col">
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
      <div className="flex justify-between" ref={containerRef}>
      {dropdowns.map((dropdown, index) => (
        <div key={index} className="relative inline-block text-left">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            {dropdown.label}
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {openIndex === index && (
            <div className="absolute left-0 w-48 mt-1 origin-top-right divide-y divide-gray-100 rounded-none shadow-lg ring-1 z-10">
              <div>
                {dropdown.items.map((item, idx) => (
                  <button
                    key={idx}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 rounded-none"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
        
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {searchList &&
        searchList.map((cocktail) => (
          <DrinkCard
            key={cocktail.idDrink}
            name={cocktail?.strDrink ?? ""}
            image={`${cocktail?.strDrinkThumb}/small`}
            alcoholic={cocktail?.strAlcoholic ?? ""}
            //   tags={cocktailFields?.strTags ?? ""}
          />
        ))}</div></>
  );
}

export default Searchbar;
