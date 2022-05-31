import "./App.css";
import { Signin } from "./pages/Authentication/loginPage";
import {  Routes , Route } from "react-router-dom"
import { Signup } from "./pages/Authentication/signupPage";
import { HomePage } from "./pages/Homepage/homePage";
import { ArchivePage } from "./pages/Archive/archive";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = "/login" element = {<Signin />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/" element = {<HomePage/>} />
        <Route path = "/archives" element = {<ArchivePage />} />
      </Routes>
    </div>
  );
}

export default App;
