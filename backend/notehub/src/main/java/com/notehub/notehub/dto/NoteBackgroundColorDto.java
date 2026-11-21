package com.notehub.notehub.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.notehub.notehub.enums.BackgroundColor;
import jakarta.validation.constraints.NotNull;

public class NoteBackgroundColorDto
{
    @NotNull(message = "Background color cannot be null")
    private BackgroundColor backgroundColor;




    public BackgroundColor getBackgroundColor() {
        return backgroundColor;
    }

    public void setBackgroundColor(BackgroundColor backgroundColor) {
        this.backgroundColor = backgroundColor;
    }
}
