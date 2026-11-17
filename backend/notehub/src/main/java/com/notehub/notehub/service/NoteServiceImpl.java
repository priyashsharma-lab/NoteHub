package com.notehub.notehub.service;

import com.notehub.notehub.dto.NoteDto;
import com.notehub.notehub.dto.NoteMapper;
import com.notehub.notehub.entity.Note;
import com.notehub.notehub.exception.InvalidNoteStateException;
import com.notehub.notehub.repository.NoteRepository;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
        return noteRepository.findByDeletedAtIsNull();
    }

    @Override
    public Note getNoteById(Long id)
    {
        log.debug("Fetching a note by id: {}",id);
        return noteRepository.findByIdAndDeletedAtIsNull(id).orElseThrow(()->new EntityNotFoundException("Note not found with id:"+id));
    }

    @Override
    @Transactional
    public Note updateNote(Long id,NoteDto noteDto)
    {
        Note existingNote=noteRepository.findByIdAndDeletedAtIsNull(id).orElseThrow(()->new EntityNotFoundException("Note not found with id:"+ id));
        noteMapper.updateNoteEntity(existingNote,noteDto);
        log.info("Updating a note with id: {}",id);
        return existingNote;
    }

    @Override
    @Transactional
    public void trashNote(Long id)
    {
        Note existingNote=noteRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Note not found with id:"+id));
        if (existingNote.getDeletedAt()!=null)
        {
            throw new InvalidNoteStateException("Note is already trashed with id "+id);
        }
        existingNote.setDeletedAt(LocalDateTime.now());
        log.info("Trashed a note with id: {}",id);
    }

    @Override
    public List<Note> getDeletedNotes()
    {
        log.debug("Fetching deleted Notes");
        return noteRepository.findByDeletedAtIsNotNull();
    }

    @Override
    @Transactional
    public Note restoreNote(Long id)
    {
        Note existingNote=noteRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Note not found with id:"+id));
        if (existingNote.getDeletedAt()==null)
        {
            throw new InvalidNoteStateException("Note with id "+id+" is not trashed");
        }
        existingNote.setDeletedAt(null);
        log.info("Restored a note with id:{}",id);
        return existingNote;
    }

    @Override
    @Transactional
    public void deleteNoteForever(Long id)
    {
        Note note=noteRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Note not found with id:\"+id"));
        if (note.getDeletedAt()==null)
        {
            log.warn("Note with {} is active",id);
            throw new InvalidNoteStateException("Note with id "+id+" is Active and cannot be deleted permanently");
        }
        noteRepository.deleteById(id);
        log.info("Note with id {} is deleted Permanently!",id);
    }

    @Override
    @Transactional
    public void deleteAllTrashNotes()
    {
        noteRepository.deleteByDeletedAtIsNotNull();
        log.info("All Trash Notes are deleted Permanently!");
    }
}
