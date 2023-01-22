import {NavLink, useLocation} from "react-router-dom"
import { useNote } from "../contexts";
import { useFilters } from "../contexts/filterContext"

const Sidebar = () => {
  const {pathname} = useLocation()
  const {sortBy , dispatchFilter} = useFilters();
  const {isDarkMode} = useNote()

    return (
        <aside className = {isDarkMode? "sidebar-container dark-mode" : "sidebar-container"}>
        <ul className = {isDarkMode? "sidebar-nav dark-mode" : "sidebar-nav"}>
          <NavLink to = "/home" className={({ isActive }) => 
                     (isActive ? "sidebar-link-active  " : " link ")}> <li className = {isDarkMode? "sidebar-link hover ml1 dark-mode" : "sidebar-link hover ml1"} ><span className="material-icons">home</span> Home </li>
          </NavLink>
          <NavLink to = "/login" className={({ isActive }) => 
                     (isActive ? "sidebar-link-active " : " link")}> <li className = {isDarkMode? "sidebar-link hover ml1 dark-mode" : "sidebar-link hover ml1"} ><span className="material-icons">account_circle</span> Account </li>
          </NavLink>
          <NavLink to = "/archives" className={({ isActive }) => 
                     (isActive ? "sidebar-link-active " : " link")}> <li className = {isDarkMode? "sidebar-link hover ml1 dark-mode" : "sidebar-link hover ml1"}><span className="material-icons">archive</span> Archives </li>
          </NavLink>
          <NavLink to = "/trash" className={({ isActive }) => 
                     (isActive ? "sidebar-link-active " : " link")}> <li className = {isDarkMode? "sidebar-link hover ml1 dark-mode" : "sidebar-link hover ml1"} ><span className="material-icons">auto_delete</span> Trash </li>
          </NavLink>
        </ul>
        { pathname === "/home" &&  (<fieldset className="ml1 mt5 filter-box">
          <div className="flex">
            <legend className="">
              Sort By Time
            </legend>
            <button
              className= {isDarkMode ? "btn dark-mode" : "btn"}
              onClick={() => {
                dispatchFilter({ type: "CLEAR" });
              }}
            >
              Clear
            </button>
          </div>
          <ul className="filter-list">
            <li className="mb1">
              <label htmlFor="newest-first" className="">
                <input
                className = "mr2"
                  type="radio"
                  id="newest-first"
                  name="sort"
                  checked={sortBy && sortBy === "NEWEST_FIRST"}
                  onChange={e =>
                    dispatchFilter({
                      type: "SORT",
                      payload: "NEWEST_FIRST",
                    })
                  }
                />
                <span className="ml-4">Newest First</span>
              </label>
            </li>
            <li className="pt-2">
              <label htmlFor="oldest-first" className="cursor-pointer">
                <input
                className = "mr2"
                  type="radio"
                  id="oldest-first"
                  name="sort"
                  checked={sortBy && sortBy === "OLDEST_FIRST"}
                  onChange={e =>
                    dispatchFilter({
                      type: "SORT",
                      payload: "OLDEST_FIRST",
                    })
                  }
                />
                <span className="ml-4">Oldest First </span>
              </label>
            </li>
          </ul>
        </fieldset>)
        }
        </aside>
    )
}

export {Sidebar}