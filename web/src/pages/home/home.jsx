import { AuthContext } from "../../context/auth";
import { useContext } from "react";
import './home.css'
// import { Link } from "react-router-dom";
export const Home = () =>{

    const {signOut} = useContext(AuthContext)

    const handleSignOut = async e =>{
        await signOut();
    }

    return (
        <section className="home">
            <button className="home-button"onClick={handleSignOut}>Sign out</button>
            <h1>Welcome to Notes-App</h1>
           
            {/* <ul>
                <Link  to ="/arq">Arquivados</Link>
            </ul> */}
        </section>
    );
}
