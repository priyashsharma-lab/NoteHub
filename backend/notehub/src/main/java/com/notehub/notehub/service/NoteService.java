package com.notehub.notehub.service;

import com.notehub.notehub.dto.NoteDto;
import com.notehub.notehub.entity.Note;

import java.util.List;

public interface NoteService
{
    public Note createNote(NoteDto noteDto);
    public List<Note> getAllNotes();
    public Note getNoteById(Long id);
    public Note updateNote(Long id,NoteDto noteDto);
    public void deleteNote(Long id);
}
