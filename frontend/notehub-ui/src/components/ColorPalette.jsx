import './ColorPalette.css';
import { NOTE_COLORS } from '../constants/NoteColors';

const COLOR_KEYS = [
    "WHITE", "RED", "ORANGE", "YELLOW", "GREEN", "TEAL",
    "BLUE", "DARKBLUE", "PURPLE", "PINK", "BROWN", "GREY"
];

function ColorPalette({
    noteBackgroundColor,
    isProcessing,
    note,
    setFeedbackMessage,
    handleChangeNoteBackground,
    setNoteBackgroundColor,
    isNoteComposer
}) {
    async function handleSelectColor(e, color) {
        e.stopPropagation();

        if (isNoteComposer) {
            setNoteBackgroundColor(color);
            return;
        }

        try {
            await handleChangeNoteBackground(note.id, color);
        } catch (error) {
            setFeedbackMessage("Error:Note BackgroundColor Change Failed! " + (error.response?.data?.message || error.message || ""));
        }
    }

    const activeColor = noteBackgroundColor || "WHITE";

    return (
        <div className="ColorPalette-container">
            {COLOR_KEYS.map((color) => {
                const isSelected = activeColor === color;
                return (
                    <button
                        key={color}
                        type="button"
                        disabled={isProcessing}
                        onClick={(e) => handleSelectColor(e, color)}
                        style={{ backgroundColor: NOTE_COLORS[color] }}
                        className={`ColorPalette-swatch ${color === "WHITE" ? "is-default" : ""} ${isSelected ? "is-active" : ""}`}
                    >
                        {color === "WHITE" && (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.2 8.7L12 6.8l3.2 3.4a4.5 4.5 0 0 1 .9 4.7"></path>
                                <path d="M8.8 10.2a4.5 4.5 0 0 0 6.1 5.9"></path>
                                <line x1="8" y1="8" x2="16" y2="16"></line>
                            </svg>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export default ColorPalette;