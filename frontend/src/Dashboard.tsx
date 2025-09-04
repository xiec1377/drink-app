// import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    console.log("response:", response.data);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return <p>hello this is dashboard</p>;
}

export default Dashboard;
