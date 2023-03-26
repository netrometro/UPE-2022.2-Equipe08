import { useState } from "react";
import { api } from "../services/api";
import {TbTrash } from "react-icons/tb";
import {BiArchiveOut} from "react-icons/bi";
import "./note.css";

function ArchivedNotes({id, text, archived, setNotes}){
    const [isArchived] = useState(archived);

    const handleUnarchiveNote = async () => {
        try {
            const response = await api.put(`/notes/unarchive/${id}`);
            if (response.status === 200) {
                alert ("Nota desarquivada com sucesso");
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
                <BiArchiveOut className="unarchive-note" onClick={handleUnarchiveNote}></BiArchiveOut>
            </footer>
        </div>
    )
}

export default ArchivedNotes;
