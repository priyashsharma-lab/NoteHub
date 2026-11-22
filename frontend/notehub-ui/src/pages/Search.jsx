import { useNotes } from '../hooks/useNotes';
import './Search.css';
import { getNonDeletedNotes } from '../services/noteService';
import NoteGrid from '../components/NoteGrid';
import NoteEditor from '../components/NoteEditor.jsx';
import { useMemo } from 'react';
import { archiveNote ,pinNote,unpinNote,unarchiveNote,copyNote} from '../services/noteService.js';
function Search({searchInput,refreshTrigger})
{
    const {notes,setNotes,selectedNote,feedbackMessage,setFeedbackMessage,onSaveUpdate,onCloseUpdate,isProcessing,setIsProcessing,gridProps,setSelectedNote,handleChangeNoteBackground,onCopy}=useNotes(getNonDeletedNotes,refreshTrigger,true);   

    const { normalNotes, archivedNotes } = useMemo(() =>{
        const query = searchInput.trim().toLowerCase();
        if (query.length===0)
        {
            return({
                normalNotes:[],
                archivedNotes:[]
            });
        }
        
        const filteredNotes=notes.filter((note)=>{
            const title = (note.title ?? "").toLowerCase();
            const content = (note.content ?? "").toLowerCase();
            if (title.includes(query) || content.includes(query))
            {
                return true;
            }
            return false;
        })
        return({
            normalNotes:filteredNotes.filter((note)=>note.archived===false),
            archivedNotes:filteredNotes.filter((note)=>note.archived===true)
        });
    }, [searchInput,notes]);
    
    async function handleArchiveNote(noteToArchive)
    {
        try
        {
            setIsProcessing(true);
            const response=await archiveNote(noteToArchive.id);
            setNotes(n=>n.map((nt)=>nt.id!==response.id?nt:response));
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

    async function handleUnarchiveNote(noteToArchive)
    {
        try
        {
            setIsProcessing(true);
            const response=await unarchiveNote(noteToArchive.id);
            setNotes(n=>n.map((nt)=>nt.id!==response.id?nt:response));
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

    const onSearchFieldEmptyOrNoNotesContent=(
        <div className="Search-onSearchFieldEmptyorNoNotes-container">
            <p>{(searchInput.trim().length===0)?"Results will appear here.":(archivedNotes.length===0 && normalNotes.length===0?"No results found.":undefined)}</p>
        </div>
    );
    return(
        <div className="Search-container">
            <div className="Search-normalnotes-container">
                <NoteGrid {...gridProps} notes={normalNotes} handleArchiveNote={handleArchiveNote} handlePinNote={handlePinNote} handleUnpinNote={handleUnpinNote} handleChangeNoteBackground={handleChangeNoteBackground} onCopy={onCopy} handleUnarchiveNote={handleUnarchiveNote}/>
            </div>
            <div className="Search-archivednotes-container">
                {archivedNotes.length===0?undefined:<p>Archived</p>}
                <NoteGrid {...gridProps} notes={archivedNotes} handleArchiveNote={handleArchiveNote} handlePinNote={handlePinNote} handleUnpinNote={handleUnpinNote} handleChangeNoteBackground={handleChangeNoteBackground} onCopy={onCopy} handleUnarchiveNote={handleUnarchiveNote}/>
            </div>
                {selectedNote&&<NoteEditor note={selectedNote} onSaveUpdate={onSaveUpdate} onCloseUpdate={onCloseUpdate} handleArchiveNote={handleArchiveNote} isProcessing={isProcessing} handlePinNote={handlePinNote} handleUnpinNote={handleUnpinNote} handleChangeNoteBackground={handleChangeNoteBackground} setIsProcessing={setIsProcessing} setFeedbackMessage={setFeedbackMessage} handleUnarchiveNote={handleUnarchiveNote}/>}
                {feedbackMessage&&feedbackMessageContent}
                {onSearchFieldEmptyOrNoNotesContent}
        </div>
    );
}

export default Search