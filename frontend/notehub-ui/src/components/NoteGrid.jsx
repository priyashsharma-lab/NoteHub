import NoteCard from "./NoteCard";
import './NoteGrid.css';
function NoteGrid({notes,onNoteClick,onDelete,setFeedbackMessage,isTrash,onDeleteForever,onRestore,isProcessing})
{
    return(
        <div className="NoteGrid-container">
            {notes.map((note)=><NoteCard key={note.id} note={note} onNoteClick={onNoteClick} onDelete={onDelete} setFeedbackMessage={setFeedbackMessage} isTrash={isTrash} onDeleteForever={onDeleteForever} onRestore={onRestore}  isProcessing={isProcessing}/>)}
        </div>
    );
}

export default NoteGrid