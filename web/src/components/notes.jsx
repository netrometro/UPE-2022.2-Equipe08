import { useState } from "react";
import { api } from "../services/api";
import {RiDeleteBin4Line } from "react-icons/ri";
import { BiArchiveIn, BiArchiveOut} from "react-icons/bi";
import "./note.css";

function Notes({id, text, archived, setNotes}){
    const [isArchived, setIsArchived] = useState(archived);

    const handleArchiveNote = async () => {
        try {
            const response = await api.put(`/notes/archive/${id}`);
            if (response.status === 200) {
                setIsArchived(true);
                setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleUnarchiveNote = async () => {
        try {
            const response = await api.put(`/notes/unarchive/${id}`);
            if (response.status === 200) {
                setIsArchived(false);
                setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleDeleteForever = async() => {
        try {
            const response = await api.delete(`/notes/delete/${id}`);
            if (response.status === 200){
                alert ("Nota deletada com sucesso")
            }
        } catch(error){
            console.log(error)
        }
    }

    return(
        <div className={`note ${isArchived ? "archived" : ""}`}>
            <span>{text}</span>
            <footer className="note-footer">
                <RiDeleteBin4Line className="trash-note" onClick={handleDeleteForever}></RiDeleteBin4Line>
                {!isArchived && <BiArchiveIn className="archive-note" onClick={handleArchiveNote}></BiArchiveIn>}
                {!isArchived && <BiArchiveOut className="unarchive-note" onClick={handleUnarchiveNote}></BiArchiveOut>}
            </footer>
        </div>
    )
}

export default Notes;
