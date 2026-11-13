import NoteCard from "./NoteCard";
import './NoteGrid.css';
function NoteGrid({notes,onNoteClick})
{
    return(
        <div className="NoteGrid-container">
            {notes.map((note)=><NoteCard key={note.id} note={note} onNoteClick={onNoteClick}/>)}
        </div>
    );
}

export default NoteGrid