import './NoteCard.css';
import pinlogo from '../assets/pin.svg';
import pinlogofill from '../assets/pin-fill.svg';
import imageicon from '../assets/imageicon.png';
import colorpallet from '../assets/colorpallet.png';
import archiveicon from '../assets/archiveicon.svg';
import restoreicon from '../assets/restoreicon.jpg';
import deleteforevericon from '../assets/deleteforevericon.png';
import { useEffect, useRef, useState } from 'react';
function NoteCard({note,onNoteClick,onDelete,setFeedbackMessage,isTrash,onDeleteForever,onRestore,isProcessing})
{
    const [isMoreMenuActive,setIsMoreMenuActive]=useState(false);
    const [isDeleting,setIsDeleting]=useState(false);
    const notecardSectionBottomRef=useRef(null);
    useEffect(
        ()=>
        {
            if (!isMoreMenuActive) return;

            function handleOutsideClick(event)
            {
                if (notecardSectionBottomRef.current&&!notecardSectionBottomRef.current.contains(event.target))
                {
                    setIsMoreMenuActive(false);
                }
            }

            window.addEventListener("mousedown",handleOutsideClick,true);
            return ()=>{window.removeEventListener("mousedown",handleOutsideClick,true)};
        },[isMoreMenuActive]);
    function handleMoreButtonOnClick(e)
    {
        e.stopPropagation();
        setIsMoreMenuActive(i=>i?false:true);
    }

    async function handleDeleteButtonOnClick(e)
    {
        e.stopPropagation();
        try
        {
            setIsDeleting(true);
            await onDelete(note);
            setFeedbackMessage("Note Deleted Successfully");
        }
        catch(error)
        {
            console.log("Error:Deletion Failed! "+(error.response?.data?.message || error.message));
            setFeedbackMessage("Error:Deletion Failed! "+(error.response?.data?.message || error.message || ""));
        }
        finally
        {
            setIsDeleting(false);
        }
    }

    const moreMenuContent=(
        <div className="NoteCard-moremenu-container">
            <button onClick={(e)=>e.stopPropagation()}>Make a copy</button>
            <button onClick={(e)=>handleDeleteButtonOnClick(e)} disabled={isDeleting}>Delete</button>
        </div>
    );
    const trashPageBottomSectionContent=(
        <>
        <button type="button" onClick={(e) =>
        {
            e.stopPropagation(); 
            onDeleteForever(note);
        }} disabled={isProcessing}>
            <img src={deleteforevericon} alt="deleteforever" /></button>
        <button type="button" onClick={(e) =>
        {
            onRestore(e,note);
        }} disabled={isProcessing}>
            <img src={restoreicon} alt="restoreicon" /></button>
        </>
        
    );
    const homePageBottomSectionContent=(
            <>
            <button type="button" onClick={(e) => e.stopPropagation()}><img src={colorpallet} alt="Colorpallet Icon" /></button>
            <button type="button" onClick={(e) => e.stopPropagation()}><img src={imageicon} alt="Image Icon" /></button>
            <button type="button" onClick={(e) => e.stopPropagation()}><img src={archiveicon} alt="archiveicon" /></button>
            <button type="button" onClick={(e) => handleMoreButtonOnClick(e)}><span>&#8942;</span></button>                {isMoreMenuActive?moreMenuContent:null}
            {/* Add more later */}
            </>
    );
    return(
        <div className="NoteCard-container" onClick={()=>onNoteClick(note)}>
            <div className="NoteCard-section-top">
                <span>{note.title}</span>
                {
                    isTrash?undefined:
                    <>
                        <button
                        className={`NoteCard-pin-button ${note.pinned ? 'is-pinned' : ''}`}
                        type="button"
                        aria-label={note.pinned ? "Unpin note" : "Pin note"}
                        title={note.pinned ? "Unpin note" : "Pin note"}
                        onClick={(e) => e.stopPropagation()}>
                            <img src={note.pinned ? pinlogofill : pinlogo} alt="Pin icon" />
                        </button>
                    </>
                }
            </div>
            <div className="NoteCard-section-middle">
                {note.content && note.content.trim() ? 
                ( <p>{note.content}</p>) : 
                ( <p className="NoteCard-empty-text">Empty note</p>)}
            </div>
            <div className="NoteCard-section-bottom" ref={notecardSectionBottomRef}>
                {
                    isTrash?trashPageBottomSectionContent:homePageBottomSectionContent
                }
            </div>
        </div>
    );
}

export default NoteCard