import TrashNotes from "./deletedNotes";
import "./note.css"


function NotesTrashList({ notes}) {
    const archNotes = notes.filter(note => note.isDeleted);

    return (
        <div className="notes-list">
            {archNotes.map((note) => (
                <TrashNotes id={note.id} text={note.text} isArchived={note.isArchived} isDeleted={note.isDeleted}/>
            ))}

        </div>
    )
}

export default NotesTrashList;
