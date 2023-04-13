import { AuthContext } from "../../context/auth";
import { useContext, useEffect} from "react";
import '../home/home.css';
import { BiHomeAlt2} from "react-icons/bi";
import { TbTrash } from "react-icons/tb"


import { useState } from "react";
import { api } from "../../services/api";

import {Link} from "react-router-dom"
import NotesArchList from "../../components/notesArchList";
import SearchBar from "../../components/SearchBar";

export const Archives = () =>{

    const [searchText, setSearchText] = useState("");

    const session = JSON.parse(localStorage.getItem("@Auth:user"))
    
    
    const [notes, setNotes] = useState([]);
    
    const retrieve = async () => {
        const saved = await api.get(`/notes/user/${session.id}`)
        if (saved) {
            const savedNotes = [...saved.data]
            setNotes(savedNotes);
        }                
    } 
    
     useEffect(()=>{
        retrieve();
    })

    const {signOut} = useContext(AuthContext)

    const handleSignOut = async e =>{
        await signOut();
    }
    

    return (
        <section className="home">
            <header>
                <h1>Archived Notes</h1>
                <aside>
                    <Link to="/trash">
                        <TbTrash className="trash-icon" size="2.3em" ></TbTrash>
                    </Link>
                    <Link to="/home">
                        <BiHomeAlt2 className="home-icon" size="2.5em"></BiHomeAlt2>
                    </Link>
                    
                    <button className="home-button"onClick={handleSignOut}>Sign out</button>
                </aside>
            </header>
            <div>
                <SearchBar handleSearch={setSearchText}/> 
                <NotesArchList notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))}/>
            </div> 


        </section>
    );
}
