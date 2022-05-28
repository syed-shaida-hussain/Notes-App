import {NavLink} from "react-router-dom"

const Sidebar = () => {
    return (
        <aside className = "sidebar-container">
        <ul className = "sidebar-nav">
          <NavLink to = "/" className={({ isActive }) => 
                     (isActive ? "sidebar-link-active  " : " link ")}> <li className = "sidebar-link hover" ><span className="material-icons">home</span> Home </li>
          </NavLink>
          <NavLink to = "/login" className={({ isActive }) => 
                     (isActive ? "sidebar-link-active " : " link")}> <li className = "sidebar-link hover ml1" ><span className="material-icons">account_circle</span> Account </li>
          </NavLink>
        </ul>
        </aside>
    )
}

export {Sidebar}