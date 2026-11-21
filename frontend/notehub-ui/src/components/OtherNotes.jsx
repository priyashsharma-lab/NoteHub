import NoteGrid from './NoteGrid';
import './OtherNotes.css';

function OtherNotes({notes,onNoteClick,onDelete,setFeedbackMessage,isTrash,onDeleteForever,onRestore,isProcessing,setIsProcessing,handleArchiveNote,handleUnarchiveNote,isPinnedNotesEmpty,handlePinNote,handleUnpinNote,handleChangeNoteBackground,onCopy})
{
    return(
        <div className="OtherNotes-container">
            {isPinnedNotesEmpty?undefined:<p>OTHERS</p>}
            <NoteGrid notes={notes} onNoteClick={onNoteClick} onDelete={onDelete} setFeedbackMessage={setFeedbackMessage} isTrash={isTrash} onDeleteForever={onDeleteForever} onRestore={onRestore} isProcessing={isProcessing} setIsProcessing={setIsProcessing} handleArchiveNote={handleArchiveNote} handleUnarchiveNote={handleUnarchiveNote} handlePinNote={handlePinNote} handleUnpinNote={handleUnpinNote} handleChangeNoteBackground={handleChangeNoteBackground} onCopy={onCopy}/>
        </div>
    );
}

export default OtherNotes