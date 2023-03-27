import ArchivedNotes from "./archivedNotes";
import "./note.css"


function NotesArchList({ notes}) {
    const archNotes = notes.filter(note => note.isArchived && !note.isDeleted);

    return (
        <div className="notes-list">
            {archNotes.map((note) => (
                <ArchivedNotes id={note.id} text={note.text} isArchived={note.isArchived} />
            ))}

        </div>
    )
}

export default NotesArchList;
