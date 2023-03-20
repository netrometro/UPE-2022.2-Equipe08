import Notes from "./notes";
import "./note.css"
import AddNote from "./AddNote";


function NotesList({notes, handleAddNote}){
    const unarchivedNotes = notes.filter(note => !note.isArchived);

        return (
            <div className="notes-list">
                {unarchivedNotes.map((note)=>(
                    <Notes id={note.id} text={note.text} isArchived={note.isArchived}/>
                ))}
                <AddNote handleAddNote={handleAddNote}/>
            </div>
        )
    }

export default NotesList;
