import './NoteCard.css';
import pinlogo from '../assets/pin.svg'
import pinlogofill from '../assets/pin-fill.svg'
import imageicon from '../assets/imageicon.png'
import colorpallet from '../assets/colorpallet.png'
import archiveicon from '../assets/archiveicon.svg'
function NoteCard({note,onNoteClick})
{
    return(
        <div className="NoteCard-container" onClick={()=>onNoteClick(note)}>
            <div className="NoteCard-section-top">
                <span>{note.title}</span>
                <button
                className={`NoteCard-pin-button ${note.pinned ? 'is-pinned' : ''}`}
                type="button"
                aria-label={note.pinned ? "Unpin note" : "Pin note"}
                title={note.pinned ? "Unpin note" : "Pin note"}
                onClick={(e) => e.stopPropagation()}
                ><img src={note.pinned ? pinlogofill : pinlogo} alt="Pin icon" /></button>
            </div>
            <div className="NoteCard-section-middle">
                {note.content && note.content.trim() ? 
                ( <p>{note.content}</p>) : 
                ( <p className="NoteCard-empty-text">Empty note</p>)}
            </div>
            <div className="NoteCard-section-bottom">
                <button type="button" onClick={(e) => e.stopPropagation()}><img src={colorpallet} alt="Colorpallet Icon" /></button>
                <button type="button" onClick={(e) => e.stopPropagation()}><img src={imageicon} alt="Image Icon" /></button>
                <button type="button" onClick={(e) => e.stopPropagation()}><img src={archiveicon} alt="archiveicon" /></button>
                {/* Add more later */}
            </div>
        </div>
    );
}

export default NoteCard