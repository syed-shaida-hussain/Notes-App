import {Link} from "react-router-dom"
import { useAuth, useNote } from "../contexts"

const Header = () => {
  const {auth : {status}} = useAuth()
  const {isDarkMode , setIsDarkMode} = useNote()

  const logout = () =>{
    window.location.reload(true)
    localStorage.removeItem("AUTH_TOKEN")
  }
    return (<header className= {isDarkMode ? "flex header dark-mode" : "flex header"} >
    <h2 className="primary-color ml1 brand">MarkDown</h2>
    {!isDarkMode ? <span className="material-icons mr2" onClick={() => setIsDarkMode(!isDarkMode)}>dark_mode</span> :     <span className="material-icons mr2" onClick={() => setIsDarkMode(!isDarkMode)}>light_mode</span>
 }
    {status ? <button className = "mr2 btn primary-bg btn-color" onClick = {() => logout()}>Logout</button> : <button className = "mr2 btn primary-bg "> <Link className = "link btn-color" to = "/login">Login</Link></button>}
  </header>)
}

export {Header}