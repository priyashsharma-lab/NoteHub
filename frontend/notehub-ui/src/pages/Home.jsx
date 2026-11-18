import React, { useState } from 'react';
import NoteComposer from '../components/NoteComposer.jsx';
import { getAllNotes, archiveNote } from '../services/noteService.js';
import NoteGrid from '../components/NoteGrid.jsx';
import './Home.css';
import NoteEditor from '../components/NoteEditor.jsx';
import { useNotes } from '../hooks/useNotes.js';

function Home()
{
    const [isPinned,setIsPinned]=useState(false);
    const {setNotes,selectedNote,feedbackMessage,setFeedbackMessage,onCreate,onSaveUpdate,onCloseUpdate,isProcessing,setIsProcessing,gridProps}=useNotes(getAllNotes);

    async function handleArchiveNote(noteToArchive)
    {
        try
        {
            setIsProcessing(true);
            const response=await archiveNote(noteToArchive.id);
            setNotes(n=>n.filter((note)=>note.id!==response.id));
            setFeedbackMessage("Note Archived!");
            onCloseUpdate();
        }
        catch(error)
        {
            setFeedbackMessage("Error:Archive Failed! "+(error.response?.data?.message || error.message || ""));
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

    return(
        <>
            <main className="content-area">
                <NoteComposer isPinned={isPinned} setIsPinned={setIsPinned} onCreate={onCreate}/>
                <NoteGrid {...gridProps} handleArchiveNote={handleArchiveNote}/>
                {selectedNote&&<NoteEditor note={selectedNote} onSaveUpdate={onSaveUpdate} onCloseUpdate={onCloseUpdate} handleArchiveNote={handleArchiveNote} isProcessing={isProcessing} />}
                {feedbackMessage&&feedbackMessageContent}
            </main>
        </>
    )
}

export default Home
