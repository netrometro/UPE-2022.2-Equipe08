import { AuthContext } from "../../context/auth";
import { useContext, useState } from "react";
import './home.css'

import { AiOutlineInbox} from "react-icons/ai";
import { TbTrash } from "react-icons/tb"

import NotesFixedList from "../../components/notesFixedList"
import NotesList from "../../components/notesList";
import SearchBar from "../../components/SearchBar";
import { api } from "../../services/api";

import {Link} from "react-router-dom"

export const Home = () =>{

    const session = JSON.parse(localStorage.getItem("@Auth:user"))
    
    
    const [notes, setNotes] = useState([]);
    
    const retrieve = async () => {
        const saved = await api.get(`/notes/user/${session.id}`)
        if (saved) {
            const savedNotes = [...saved.data]
            setNotes(savedNotes);
        }                
    }

    const [searchText, setSearchText] = useState("");

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
                <h1>Welcome to Notes-App</h1>
                <aside>
                    <Link to="/trash">
                        <TbTrash className="trash-icon" size="2.3em" ></TbTrash>
                    </Link>
                    <Link to="/archive">
                        <AiOutlineInbox className="archive-icon" size="2.5em"></AiOutlineInbox>
                    </Link>
                    <button className="home-button" onClick={retrieve}>Show notes</button>

                    <button className="home-button"onClick={handleSignOut}>Sign out</button>
                    
                </aside>
            </header>
            <div>
               <SearchBar handleSearch={setSearchText}/>
               <h2 className="h2">Fixadas</h2>
               <NotesFixedList notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))} handleAddNote={addNote}/>
               <br></br>
               <h2 className="h2">Notas</h2>
               <NotesList notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))} handleAddNote={addNote}/>
            </div> 

        </section>
    );
}
