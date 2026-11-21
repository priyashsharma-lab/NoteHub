import { useRef, useState , useEffect} from 'react';
import './NoteComposer.css';
import pinlogo from '../assets/pin.svg'
import pinlogofill from '../assets/pin-fill.svg'
import imageicon from '../assets/imageicon.svg'
import colorpallet from '../assets/colorpallet.svg'
import ColorPalette from './ColorPalette';
import { getNoteColorHex } from '../constants/NoteColors';

function NoteComposer({isPinned,setIsPinned,onCreate}) 
{
    const [isActive,setIsActive]=useState(false);
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [isProcessing,setIsProcessing]=useState(false);
    const [error,setError]=useState("");
    const [noteBackgroundColor,setNoteBackgroundColor]=useState("WHITE");
    const [isColorPaletteActive,setIsColorPaletteActive]=useState(false);
    const bgHex = getNoteColorHex(noteBackgroundColor);
    const notecomposerSectionBottomRef=useRef(null);
    useEffect(
        ()=>
        {
            if (!isColorPaletteActive) return;
            function handleOutsideClick(event)
            {
                if (notecomposerSectionBottomRef.current&&!notecomposerSectionBottomRef.current.contains(event.target))
                {
                    isColorPaletteActive?setIsColorPaletteActive(false):undefined;
                }
            }

            window.addEventListener("mousedown",handleOutsideClick,true);
            return ()=>{window.removeEventListener("mousedown",handleOutsideClick,true)};
        },[isColorPaletteActive]);
    async function handleSubmit()
    {
        if (title.trim().length===0)
        {
            setError("Title Cannot be Empty!");
            return;
        }
        else if (title.trim().length>255)
        {
            setError("Title length cannot exceed 255 characters!");
            return;
        }
        else if (content.length>10000)
        {
            setError("Content length cannot exceed 10000 characters!");
            return;
        }
        try
        {
            setIsProcessing(true);
            await onCreate({
                title:title.trim(),
                content:content,
                pinned:isPinned,
                backgroundColor:noteBackgroundColor
            });
            setTitle("");
            setContent("");
            setError("");
            setIsActive(false);
            setIsPinned(false); 
            setIsColorPaletteActive(false);
            setNoteBackgroundColor("WHITE");
        }
        catch (errors)
        {
            setError(errors.response?.data?.message || errors?.message || "Something went wrong");
        }
        finally
        {
            setIsProcessing(false);
        }
    }
    function handleTitleOnChange(e)
    {
        setTitle(e.target.value);
        setError("");
    }
    function handleContentOnChange(e)
    {
        setContent(e.target.value);
        setError("");
    }
    function handleCloseButton()
    {
        setIsActive(false);
        setTitle("");
        setContent("");
        setError("");
        setIsProcessing(false);
        setNoteBackgroundColor("WHITE");
    }
    let displayContent=""
    if (isActive===false)
    {
        displayContent=<div className="NoteComposer-collapsed-container" onClick={()=>setIsActive(true)}>
            <span>Take a note...</span>
        </div>
    }
    else
    {
        displayContent=<div className="NoteComposer-expanded-container" style={{ backgroundColor: bgHex }}>
            <div className="NoteComposer-section-top">
                <input type="text" placeholder='Title' value={title} onChange={(e)=>handleTitleOnChange(e)} style={{ backgroundColor: bgHex }}/>
                <button type="button" onClick={()=>setIsPinned(p=>p?false:true)}><img src={`${isPinned?pinlogofill:pinlogo}`} alt="pinlogo" /></button>
            </div>
            {error && <p className="NoteComposer-error">{error}</p>}
            <div className="NoteComposer-section-middle">
                <textarea placeholder='Take a note...' value={content} onChange={(e)=>handleContentOnChange(e)} style={{ backgroundColor: bgHex }}/>
            </div>
            <div className="NoteComposer-section-bottom" ref={notecomposerSectionBottomRef}>
                <button type="button" onClick={(e)=>{
                    e.stopPropagation();
                    isColorPaletteActive?setIsColorPaletteActive(false):setIsColorPaletteActive(true);
                }}><img src={colorpallet} alt="Colorpallet Icon" /></button>
                <button type="button"><img src={imageicon} alt="Image Icon" /></button>
                <button type="button">&#8630;</button>
                <button type="button">&#8631;</button>
                <button className="NoteComposer-close-create-button" onClick={handleCloseButton} type="button" disabled={isProcessing}>Close</button>
                <button className="NoteComposer-close-create-button" onClick={handleSubmit} type="button" disabled={isProcessing}>Create</button>
                {isColorPaletteActive?<ColorPalette isNoteComposer={true} setNoteBackgroundColor={setNoteBackgroundColor} setIsProcessing={setIsProcessing} isProcessing={isProcessing} noteBackgroundColor={noteBackgroundColor}/>:undefined}
            </div>
            
        </div>
    }
    return (
        <div className="NoteComposer-container">
            {displayContent}
        </div>
    );
}

export default NoteComposer;