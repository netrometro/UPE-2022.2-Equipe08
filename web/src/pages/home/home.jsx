import { AuthContext } from "../../context/auth";
import { useContext } from "react";
import './home.css'
import { AiOutlineInbox} from "react-icons/ai";
import { RiDeleteBin4Line } from "react-icons/ri"
// import { Link } from "react-router-dom";
export const Home = () =>{

    const {signOut} = useContext(AuthContext)

    const handleSignOut = async e =>{
        await signOut();
    }

    return (
        <section className="home">
            <h1>Welcome to Notes-App</h1>
            <aside>
                <RiDeleteBin4Line className="trash-icon" size="2.3em"></RiDeleteBin4Line>
                <AiOutlineInbox className="archive-icon" size="2.5em"></AiOutlineInbox>
                <button className="home-button"onClick={handleSignOut}>Sign out</button>
            </aside>
           
            {/* <ul>
                <Link  to ="/arq">Arquivados</Link>
            </ul> */}
        </section>
    );
}
