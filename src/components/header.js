import {Link} from "react-router-dom"

const Header = () => {
    return (<header className="flex header">
    <h2 className="primary-color ml1 brand">MarkDown</h2>
    <span className="material-icons mr2">dark_mode</span>
     <Link className = "mr2" to = "/login">login</Link>
    {/* <span class="material-icons mr2">light_mode</span> */}
  </header>)
}

export {Header}