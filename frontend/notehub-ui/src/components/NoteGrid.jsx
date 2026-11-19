import NoteCard from "./NoteCard";
import './NoteGrid.css';
function NoteGrid({notes,onNoteClick,onDelete,setFeedbackMessage,isTrash,onDeleteForever,onRestore,isProcessing,setIsProcessing,handleArchiveNote,handleUnarchiveNote,handlePinNote,handleUnpinNote})
{
    return(
        <div className="NoteGrid-container">
            {notes.map((note)=><NoteCard key={note.id} note={note} onNoteClick={onNoteClick} onDelete={onDelete} setFeedbackMessage={setFeedbackMessage} isTrash={isTrash} onDeleteForever={onDeleteForever} onRestore={onRestore} isProcessing={isProcessing} setIsProcessing={setIsProcessing} handleArchiveNote={handleArchiveNote} handleUnarchiveNote={handleUnarchiveNote} handlePinNote={handlePinNote} handleUnpinNote={handleUnpinNote}/>)}
        </div>
    );
}

export default NoteGrid
