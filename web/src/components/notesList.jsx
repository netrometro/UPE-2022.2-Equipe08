import Notes from "./notes";
import "./note.css"
import AddNote from "./AddNote";


function NotesList({notes, handleAddNote}){
    const unarchivedAndUndeletedNotes = notes.filter(note => !note.isArchived && !note.isDeleted && !note.isFixed);

    return (
        <div className="notes-list">
            {unarchivedAndUndeletedNotes.map((note)=>(
                <Notes id={note.id} text={note.text} isArchived={note.isArchived}/>
            ))}
            <AddNote handleAddNote={handleAddNote}/>
        </div>
    )
}

export default NotesList;

