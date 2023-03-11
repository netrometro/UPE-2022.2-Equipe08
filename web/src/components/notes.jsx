import {RiDeleteBin4Line } from "react-icons/ri"
import "./note.css"


function Notes({id, text}){
    return(
        <div className="note">
            <span>{text}</span>
            <footer className="note-footer">
                <RiDeleteBin4Line className="trash-note"></RiDeleteBin4Line>
            </footer>

        </div>
    )
}

export default Notes;