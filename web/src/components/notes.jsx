import { useState } from "react";
import { api } from "../services/api";
import { TbTrash, TbPin } from "react-icons/tb";
import { AiOutlineEdit } from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";
import "./note.css";

function Notes({ id, text, archived, setNotes }) {
  const [isArchived] = useState(archived);
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(text);

  const handleArchiveNote = async () => {
    try {
      const response = await api.put(`/notes/archive/${id}`);
      if (response.status === 200) {
        alert("Nota arquivada com sucesso");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMoveToTrash = async () => {
    try {
      const response = await api.put(`/notes/trash/${id}`);
      if (response.status === 200) {
        alert("Nota movida para a lixeira");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pinNote = async () => {
    try {
      const response = await api.put(`/notes/fixed/${id}`);
      if (response.status === 200) {
        alert("Nota fixada com sucesso");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
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
            <TbTrash className="trash-note" onClick={handleMoveToTrash} />
            <BiArchiveIn className="archive-note" onClick={handleArchiveNote} />
            <TbPin className="pin-note" onClick={pinNote} />
            <AiOutlineEdit className="edit-note" onClick={handleEditNote} />
          </footer>
        </>
      )}
    </div>
  );
}

export default Notes;