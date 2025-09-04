import Box from "./components/Box";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-8 justify-center items-center h-screen w-screen">
      <Box caption="Drink as a guest" onClick={() => navigate("/dashboard")}>
        <p className="text-lg">
          This is a simple application to demonstrate routing and component
          structure.
        </p>
      </Box>
      <Box caption="Drink as a user" onClick={() => navigate("/dashboard")}>
        <p className="text-lg">
          This is a simple application to demonstrate routing and component
          structure.
        </p>
      </Box>
      
    </div>
  );
}

export default Home;
