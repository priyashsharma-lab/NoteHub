package com.notehub.notehub.service;

import com.notehub.notehub.dto.NoteDto;
import com.notehub.notehub.dto.NoteMapper;
import com.notehub.notehub.entity.Note;
import com.notehub.notehub.repository.NoteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import org.slf4j.Logger;

@Service
public class NoteServiceImpl implements NoteService
{
    private final NoteRepository noteRepository;
    private final NoteMapper noteMapper;
    private static final Logger log=LoggerFactory.getLogger(NoteServiceImpl.class);
    public NoteServiceImpl(NoteRepository noteRepository, NoteMapper noteMapper)
    {
        this.noteRepository=noteRepository;
        this.noteMapper=noteMapper;
    }
    @Override
    public Note createNote(NoteDto noteDto)
    {
            Note note=noteMapper.toNoteEntity(noteDto);
            Note savedNote=noteRepository.save(note);
            log.info("Note created successfully with ID: {}", savedNote.getId());
            return savedNote;
    }

    @Override
    public List<Note> getAllNotes()
    {
        log.debug("Fetching all notes");
        return noteRepository.findAll();
    }

    @Override
    public Note getNoteById(Long id)
    {
        log.debug("Fetching a note by id: {}",id);
        return noteRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Note not found with id:"+id));
    }

    @Override
    @Transactional
    public Note updateNote(Long id,NoteDto noteDto)
    {
        Note existingNote=noteRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Note not found with id:"+ id));
        noteMapper.updateNoteEntity(existingNote,noteDto);
        log.info("Updating a note with id: {}",id);
        return existingNote;
    }

    @Override
    public void deleteNote(Long id)
    {
        Note existingNote=noteRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Note not found with id:"+id));
        noteRepository.delete(existingNote);
        log.info("Deleted a note with id: {}",id);
    }
}
