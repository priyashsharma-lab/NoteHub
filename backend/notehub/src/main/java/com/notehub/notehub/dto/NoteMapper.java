package com.notehub.notehub.dto;

import com.notehub.notehub.entity.Note;
import org.springframework.stereotype.Component;

@Component
public class NoteMapper
{
    public NoteResponseDto toNoteResponseDto(Note note)
    {
        NoteResponseDto noteResponseDto=new NoteResponseDto();
        noteResponseDto.setId(note.getId());
        noteResponseDto.setTitle(note.getTitle());
        noteResponseDto.setContent(note.getContent());
        noteResponseDto.setArchived(note.isArchived());
        noteResponseDto.setPinned(note.isPinned());
        noteResponseDto.setCreatedAt(note.getCreatedAt());
        noteResponseDto.setUpdatedAt(note.getUpdatedAt());
        return noteResponseDto;
    }

    public Note toNoteEntity(NoteDto noteDto)
    {
        Note note=new Note();
        note.setTitle(noteDto.getTitle());
        note.setContent(noteDto.getContent());
        return note;
    }

    public void updateNoteEntity(Note note,NoteDto noteDto)
    {
        note.setTitle(noteDto.getTitle());
        note.setContent(noteDto.getContent());
    }
}
