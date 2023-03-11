import Notes from "./notes";
import "./note.css"
import AddNote from "./AddNote";


function NotesList({notes, handleAddNote}){

    return (
        <div className="notes-list">
            {notes.map((note)=>(
                <Notes id={note.id} text={note.text}/>
            ))}
            <AddNote handleAddNote={handleAddNote}/>
        </div>
    )
}

export default NotesList;