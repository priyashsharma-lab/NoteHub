export const NOTE_COLORS = {
    WHITE: "#ffffff",    // Default
    RED: "#faafa8",      // Coral / Red
    ORANGE: "#f39f76",   // Peach / Orange
    YELLOW: "#fff8b8",   // Sand / Yellow
    GREEN: "#e2f6d3",    // Mint / Green
    TEAL: "#b4ddd3",     // Sage / Teal
    BLUE: "#d4e4ed",     // Fog / Light Blue
    DARKBLUE: "#aeccdc", // Storm / Blue-Grey
    PURPLE: "#d3bfdb",   // Dusk / Purple
    PINK: "#f6e2dd",     // Blossom / Pink
    BROWN: "#e9e3d4",    // Clay / Sand-Brown
    GREY: "#efeff1",     // Chalk / Light Grey
};

export function getNoteColorHex(colorEnum) {
    return NOTE_COLORS[colorEnum] || NOTE_COLORS.WHITE;
}