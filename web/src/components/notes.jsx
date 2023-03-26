import { useState } from "react";
import { api } from "../services/api";
import {TbTrash } from "react-icons/tb";
import { BiArchiveIn} from "react-icons/bi";
import "./note.css";

function Notes({id, text, archived, setNotes}){
    const [isArchived] = useState(archived);

    const handleArchiveNote = async () => {
        try {
            const response = await api.put(`/notes/archive/${id}`);
            if (response.status === 200) {
                alert ("Nota arquivada com sucesso");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleMoveToTrash = async() => {
        try {
            const response = await api.put(`/notes/trash/${id}`);
            if (response.status === 200){
                alert ("Nota movida para a lixeira")
            }
        } catch(error){
            console.log(error)
        }
    }

    return(
        <div className={`note ${isArchived ? "archived" : ""}`}>
            <span>{text}</span>
            <footer className="note-footer">
                <TbTrash className="trash-note" onClick={handleMoveToTrash}></TbTrash>
                <BiArchiveIn className="archive-note" onClick={handleArchiveNote}></BiArchiveIn>
            </footer>
        </div>
    )
}

export default Notes;
