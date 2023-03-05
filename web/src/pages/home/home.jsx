import { AuthContext } from "../../context/auth";
import { useContext } from "react";
import './home.css'
export const Home = () =>{

    const {signOut} = useContext(AuthContext)

    const handleSignOut = async e =>{
        await signOut();
    }

    return (
        <div>
            <button onClick={handleSignOut}>Sign out</button>
            <h1>Welcome to Notes-App</h1>
        </div>
    );
}