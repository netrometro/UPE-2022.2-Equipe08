import { useState } from "react";
import { api } from "../services/api";
import {TbTrash, TbPinnedOff } from "react-icons/tb";
import { AiOutlineEdit } from "react-icons/ai";
import { BiArchiveIn} from "react-icons/bi";
import "./note.css";

function FixedNotes({id, text, archived, setNotes}){
    const [isArchived] = useState(archived);
    const [isEditing, setIsEditing] = useState(false);
    const [noteText, setNoteText] = useState(text);

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
            }
        } catch(error){
            console.log(error)
        }
    }
    
    const unpinnedNote = async() => {
        try {
            const response = await api.put(`/notes/notfixed/${id}`);
            if (response.status === 200){
                alert ("Nota desfixada com sucesso")
            }
        } catch(error){
            console.log(error)
        }
    }

    const handleEditNote = async () => {
        setIsEditing(true);
      };
    
      const handleSaveNote = async () => {
        try {
          const response = await api.put(`/notes/update/${id}`, {
            text: noteText,
          });
          if (response.status === 200) {
            alert("Nota atualizada com sucesso");
            setIsEditing(false);
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleCancelEditNote = () => {
        setIsEditing(false);
        setNoteText(text);
      };
    
      const handleNoteTextChange = (e) => {
        setNoteText(e.target.value);
      };

    return(
        <div className={`note ${isArchived ? "archived" : ""}`}>
        {isEditing ? (
        <>
        <div className="note new">
          <textarea
            rows="8"
            cols="10"
            value={noteText}
            onChange={handleNoteTextChange}
          ></textarea>
          <footer className="note-footer">
            <button onClick={handleSaveNote} className="save">Salvar</button>
            <button onClick={handleCancelEditNote}className="save">Cancelar</button>
          </footer>
        </div>
        </>
      ) : (
        <>
            <span>{text}</span>
            <footer className="note-footer">
                <TbTrash className="trash-note" onClick={handleMoveToTrash}></TbTrash>
                <BiArchiveIn className="archive-note" onClick={handleArchiveNote}></BiArchiveIn>
                <TbPinnedOff className="pin-note" onClick={unpinnedNote}></TbPinnedOff>
                <AiOutlineEdit className="edit-note" onClick={handleEditNote} />
            </footer>
            </>
    )}
        </div>
    )
}

export default FixedNotes;
