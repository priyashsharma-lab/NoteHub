import { useMemo, useState } from 'react';
import NoteComposer from '../components/NoteComposer.jsx';
import { getAllNotes, archiveNote ,pinNote,unpinNote} from '../services/noteService.js';
import './Home.css';
import NoteEditor from '../components/NoteEditor.jsx';
import { useNotes } from '../hooks/useNotes.js';
import PinnedNotes from '../components/PinnedNotes.jsx';
import OtherNotes from '../components/OtherNotes.jsx';

function Home({refreshTrigger, startRefreshing, endRefreshing, isRefreshing})
{
    const [isPinned,setIsPinned]=useState(false);
    const {notes,setNotes,selectedNote,feedbackMessage,setFeedbackMessage,onCreate,onSaveUpdate,onCloseUpdate,isProcessing,setIsProcessing,gridProps,setSelectedNote,handleChangeNoteBackground,onCopy}=useNotes(getAllNotes, refreshTrigger, startRefreshing, endRefreshing);

    const { pinnedNotes, otherNotes } = useMemo(() => (
        {
            pinnedNotes: notes.filter((n) => n.pinned),
            otherNotes: notes.filter((n) => !n.pinned),
        }), [notes]);
    
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

    async function handlePinNote(note)
    {
        try
        {
            setIsProcessing(true);
            const response=await pinNote(note.id);
            setNotes(n=>n.map((nt)=>(nt.id===response.id?response:nt)).sort((a,b)=>{
                if(a.pinned!==b.pinned)
                {
                    return Number(b.pinned)-Number(a.pinned);
                }
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            }));
            selectedNote?.id===response?.id&&setSelectedNote(response);
            setFeedbackMessage("Note Pinned");
        }
        catch(error)
        {
            setFeedbackMessage("Error:Pinning Failed! "+(error.response?.data?.message || error.message || ""));
        }
        finally
        {
            setIsProcessing(false);
        }
    }
    async function handleUnpinNote(note)
    {
        try
        {
            setIsProcessing(true);
            const response=await unpinNote(note.id);
            setNotes(n=>n.map((nt)=>(nt.id===response.id?response:nt)).sort((a,b)=>{
                if(a.pinned!==b.pinned)
                {
                    return Number(b.pinned)-Number(a.pinned);
                }
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            }));
            selectedNote?.id===response.id&&setSelectedNote(response);
            setFeedbackMessage("Note Unpinned");
        }
        catch(error)
        {
            setFeedbackMessage("Error:UnPinning Failed! "+(error.response?.data?.message || error.message || ""));
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


    const refreshingContent=(
        <div className="refreshingcontent">
            <span>&#8635;</span>
        </div>
    );

    return(
        <>
            {isRefreshing?refreshingContent:(<main className="content-area">
                <NoteComposer isPinned={isPinned} setIsPinned={setIsPinned} onCreate={onCreate}/>
                {pinnedNotes.length===0?undefined:<PinnedNotes {...gridProps} handleArchiveNote={handleArchiveNote} notes={pinnedNotes} handlePinNote={handlePinNote} handleUnpinNote={handleUnpinNote} handleChangeNoteBackground={handleChangeNoteBackground} onCopy={onCopy}/>}
                <OtherNotes {...gridProps} handleArchiveNote={handleArchiveNote} otherNotes={otherNotes} notes={otherNotes} isPinnedNotesEmpty={pinnedNotes.length===0?true:false} handlePinNote={handlePinNote} handleUnpinNote={handleUnpinNote} handleChangeNoteBackground={handleChangeNoteBackground} onCopy={onCopy}/>

                {selectedNote&&<NoteEditor note={selectedNote} onSaveUpdate={onSaveUpdate} onCloseUpdate={onCloseUpdate} handleArchiveNote={handleArchiveNote} isProcessing={isProcessing} handlePinNote={handlePinNote} handleUnpinNote={handleUnpinNote} handleChangeNoteBackground={handleChangeNoteBackground} setIsProcessing={setIsProcessing} setFeedbackMessage={setFeedbackMessage}/>}
                {feedbackMessage&&feedbackMessageContent}
            </main>)}
        </>
    )
}

export default Home
