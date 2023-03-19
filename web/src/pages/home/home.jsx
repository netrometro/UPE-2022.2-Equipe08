import { AuthContext } from "../../context/auth";
import { useContext, useState } from "react";
import './home.css'

import { AiOutlineInbox} from "react-icons/ai";
import { RiDeleteBin4Line } from "react-icons/ri"

import NotesList from "../../components/notesList";
import SearchBar from "../../components/SearchBar";
import { api } from "../../services/api";

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
                    <RiDeleteBin4Line className="trash-icon" size="2.3em" ></RiDeleteBin4Line>
                    <AiOutlineInbox className="archive-icon" size="2.5em"></AiOutlineInbox>
                    <button className="home-button" onClick={retrieve}>Show notes</button>
                    <button className="home-button"onClick={handleSignOut}>Sign out</button>
                </aside>
            </header>
            <div>
                <SearchBar handleSearch={setSearchText}/> 
               <NotesList notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))} handleAddNote={addNote}/>
            </div> 


        </section>
    );
}
