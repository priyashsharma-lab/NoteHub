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
    public void trashNote(Long id);
    public List<Note> getDeletedNotes();
    public Note restoreNote(Long id);
    public void deleteNoteForever(Long id);
    public void deleteAllTrashNotes();
    public Note archiveNote(Long id);
    public Note unarchiveNote(Long id);
    public List<Note> getAllArchiveNotes();
    public Note pinNote(Long id);
    public Note unpinNote(Long id);

}
