import './Archive.css';
import NoteGrid from '../components/NoteGrid';
import NoteEditor from '../components/NoteEditor';
import { getAllArchivedNotes,unarchiveNote } from '../services/noteService';
import { useNotes } from '../hooks/useNotes';

function Archive() 
{
    const {notes,selectedNote,feedbackMessage,setFeedbackMessage,onSaveUpdate,onCloseUpdate,isProcessing,gridProps,setIsProcessing,setNotes}=useNotes(getAllArchivedNotes);

    async function handleUnarchiveNote(noteToArchive)
    {
        try
        {
            setIsProcessing(true);
            const response=await unarchiveNote(noteToArchive.id);
            setNotes(n=>n.filter((note)=>note.id!==response.id));
            setFeedbackMessage("Note Unarchived!");
            onCloseUpdate();
        }
        catch(error)
        {
            setFeedbackMessage("Error:Unarchive Failed! "+(error.response?.data?.message || error.message || ""));
        }
        finally
        {
            setIsProcessing(false);
        }
    }

    const feedbackMessageContent=(
        <div className="Home-feedbackMessage-container">
            <span className={feedbackMessage.startsWith("Error")?"Home-feedbackmessage-span-error":"Home-feedbackmessage-span"}>{feedbackMessage}</span>
            <button onClick={()=>setFeedbackMessage("")}>✕</button>
        </div>
    );

    const noNotesinTrashContent=(
        <div className="Trash-nonotesintrash-container">
            <svg xmlns="http://w3.org" width="130" height="130" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm8-5.35V9.5h-2v4.15l-1.79-1.79-1.42 1.41L12 17.48l4.21-4.21-1.42-1.41L13 13.65z"/>
            </svg>
            <p>Your archived notes appear here</p>
        </div>
    );

    return (
        <div className="Archive-container">
            {notes.length===0?noNotesinTrashContent:<NoteGrid {...gridProps} handleUnarchiveNote={handleUnarchiveNote}/>}
            {selectedNote&&<NoteEditor note={selectedNote} onSaveUpdate={onSaveUpdate} onCloseUpdate={onCloseUpdate} isProcessing={isProcessing} handleUnarchiveNote={handleUnarchiveNote}/>}
            {feedbackMessage&&feedbackMessageContent}
        </div>
    );
}

export default Archive
