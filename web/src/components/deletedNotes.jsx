import { useState } from "react";
import { api } from "../services/api";
import {TbTrashOff, TbTrash} from "react-icons/tb"
import "./note.css";

function TrashNotes({id, text, archived: deleted, setNotes}){
    const [isDeleted] = useState(deleted);


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

    const handleRecover = async() => {
        try {
            const response = await api.put(`/notes/recover/${id}`);
            if (response.status === 200){
                alert ("Nota recuperada")
            }
        } catch(error){
            console.log(error)
        }
    }

    return(
        <div className={`note ${isDeleted ? "deleted" : ""}`}>
            <span>{text}</span>
            <footer className="note-footer">
                <TbTrashOff className="home-note" onClick={handleRecover}></TbTrashOff>
                <TbTrash className="trash-note" onClick={handleDeleteForever}></TbTrash>
            </footer>
        </div>
    )
}

export default TrashNotes;
