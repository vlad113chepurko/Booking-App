import "./App.css";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router";
function App() {
  const navigate = useNavigate();

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
