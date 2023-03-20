import { AuthContext } from "../../context/auth";
import { useContext } from "react";
import './archives.css'
import { BiHomeAlt2} from "react-icons/bi";
import { RiDeleteBin4Line } from "react-icons/ri"


import { useState } from "react";
import { api } from "../../services/api";

import {Link} from "react-router-dom"
import NotesArchList from "../../components/notesArchList";

export const Archives = () =>{

    const session = JSON.parse(localStorage.getItem("@Auth:user"))
    
    
    const [notes, setNotes] = useState([]);
    
    const retrieve = async () => {
        const saved = await api.get(`/notes/user/${session.id}`)
        if (saved) {
            const savedNotes = [...saved.data]
            setNotes(savedNotes);
        }                
    }

    const addNote = async (text) => {
        const data ={
            text: text,
            userId: session.id
        }

         await api.post(`/notes/user/${session.id}`, data);

         const notas = await api.get(`/notes/user/${session.id}`)

        const newNotes = [...notas.data]
        setNotes(newNotes)
    }
    

    const {signOut} = useContext(AuthContext)

    const handleSignOut = async e =>{
        await signOut();
    }
    

    return (
        <section className="home">
            <header>
                <h1>Archived Notes</h1>
                <aside>
                    <RiDeleteBin4Line className="trash-icon" size="2.3em" ></RiDeleteBin4Line>
                    <Link to="/home">
                        <BiHomeAlt2 className="home-icon" size="2.5em"></BiHomeAlt2>
                    </Link>
                    
                    <button className="home-button" onClick={retrieve}>Show notes</button>
                    <button className="home-button"onClick={handleSignOut}>Sign out</button>
                </aside>
            </header>
            <div>
               <NotesArchList notes={notes} handleAddNote={addNote}/>
            </div> 


        </section>
    );
}
