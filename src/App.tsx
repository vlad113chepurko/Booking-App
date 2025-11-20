import "./App.css";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router";
import { useEffect } from "react";
function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/dashboard/meetings");
    }
  }, [navigate]);

  return (
    <div className="app">
      <h1>Home page</h1>
      <p>That start work with To-do app, you must sign up</p>
      <Button variant="secondary" onClick={() => navigate("/form/register")}>
        Get Started
      </Button>
    </div>
  );
}

export default App;
