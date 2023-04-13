import { AuthContext } from "../../context/auth";
import { useContext, useEffect } from "react";
import '../home/home.css';
import { BiHomeAlt2} from "react-icons/bi";
import { AiOutlineInbox} from "react-icons/ai";
import SearchBar from "../../components/SearchBar";


import { useState } from "react";
import { api } from "../../services/api";

import {Link} from "react-router-dom"
import NotesTrashList from "../../components/notesTrashList";

export const Trash = () =>{

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
                <h1>Deleted Notes</h1>
                <aside>
                    <Link to="/archive">
                        <AiOutlineInbox className="archive-icon" size="2.5em"></AiOutlineInbox>
                    </Link>
                    <Link to="/home">
                        <BiHomeAlt2 className="home-icon" size="2.5em"></BiHomeAlt2>
                    </Link>

                    <button className="home-button"onClick={handleSignOut}>Sign out</button>
                </aside>
            </header>
            <div>
                <SearchBar handleSearch={setSearchText}/>
                <NotesTrashList notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))}/>
            </div> 


        </section>
    );
}
