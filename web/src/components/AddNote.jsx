import { useState } from "react";

const AddNote = ({handleAddNote}) => {

    const [noteText, setNoteText] = useState("")

    const handleChange = (e) => {
        setNoteText(e.target.value)
    }

    const handleSaveClick = () => {
        if(noteText.trim().length > 0){
            handleAddNote(noteText)
            setNoteText('');
        } 
    }

    return (
        <div className="note new">
            <textarea 
                rows="8" 
                cols="10" 
                placeholder="Type to add a note..."
                value={noteText}
                onChange={handleChange}
            ></textarea>
            <div className="note-footer">
                <button onClick={handleSaveClick} className="save">Save</button>
            </div>
        </div>
    )
}

export default AddNote;