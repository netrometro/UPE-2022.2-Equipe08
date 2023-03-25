import Notes from "./notes";
import "./note.css"
import AddNote from "./AddNote";


function NotesArchList({notes, handleAddNote}){
    const archivedNotes = notes.filter(note => note.isArchived);

        return (
            <div className="notes-list">
                {archivedNotes.map((note)=>(
                    <Notes id={note.id} text={note.text} isArchived={note.isArchived}/>
                ))}
                
            </div>
        )
    }

export default NotesArchList;
