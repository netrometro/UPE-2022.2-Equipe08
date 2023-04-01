import FixedNotes from "./fixedNotes";
import "./note.css";


function NotesFixedList({notes, handleAddNote}){
    const unarchivedAndUndeletedNotes = notes.filter(note => note.isFixed && !note.isArchived && !note.isDeleted);

    return (
        <div className="notes-list">
            {unarchivedAndUndeletedNotes.map((note)=>(
                <FixedNotes id={note.id} text={note.text} isArchived={note.isArchived}/>
            ))}
        </div>
    )
}

export default NotesFixedList;

