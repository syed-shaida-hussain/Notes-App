import "./App.css";
import { Signin } from "./pages/Authentication/loginPage";
import {  Routes , Route } from "react-router-dom"
import { Signup } from "./pages/Authentication/signupPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/login" element = {<Signin />} />
        <Route path = "/signup" element = {<Signup />} />
      </Routes>
     
    </div>
  );
}

export default App;
