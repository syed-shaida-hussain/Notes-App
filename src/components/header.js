import {Link} from "react-router-dom"
import { useAuth } from "../contexts"

const Header = () => {
  const {auth : {status}} = useAuth()

  const logout = () =>{
    window.location.reload(true)
    localStorage.removeItem("AUTH_TOKEN")
  }
    return (<header className="flex header">
    <h2 className="primary-color ml1 brand">MarkDown</h2>
    <span className="material-icons mr2">dark_mode</span>
    {status ? <button className = "mr2 btn primary-bg" onClick = {() => logout()}>Logout</button> : <button className = "btn primary-bg"> <Link className = "link" to = "/login">Login</Link></button>}
    {/* <span class="material-icons mr2">light_mode</span> */}
  </header>)
}

export {Header}