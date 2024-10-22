import Dashboard from "./pages/Dashboard";
import { Outlet } from "react-router-dom";

function App() {
 

  return (
    <>
    <Dashboard/>
    <Outlet/>
      
    </>
  );
}

export default App;
