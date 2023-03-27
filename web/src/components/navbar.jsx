import { Link } from "react-router-dom";

function Navbar(){
    return (
        <header>
          <ul>
            <li>
              <Link to="/" className="teste">Home</Link>
            </li>
            <li>
              <Link to="/register" className="teste">Register</Link>
            </li>
            <li>
              <Link to="/login" className="teste">Login</Link>
            </li>
          </ul>
        </header>
    )
}

export default Navbar;