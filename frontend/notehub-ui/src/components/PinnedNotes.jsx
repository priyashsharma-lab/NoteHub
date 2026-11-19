import NoteGrid from './NoteGrid';
import './PinnedNotes.css';

function PinnedNotes({notes,onNoteClick,onDelete,setFeedbackMessage,isTrash,onDeleteForever,onRestore,isProcessing,setIsProcessing,handleArchiveNote,handleUnarchiveNote,handlePinNote,handleUnpinNote})
{
    return(
        <div className="PinnedNotes-container">
            <p>PINNED</p>
            <NoteGrid notes={notes} onNoteClick={onNoteClick} onDelete={onDelete} setFeedbackMessage={setFeedbackMessage} isTrash={isTrash} onDeleteForever={onDeleteForever} onRestore={onRestore} isProcessing={isProcessing} setIsProcessing={setIsProcessing} handleArchiveNote={handleArchiveNote} handleUnarchiveNote={handleUnarchiveNote} handlePinNote={handlePinNote} handleUnpinNote={handleUnpinNote}/>
        </div>
    );
}

export default PinnedNotes