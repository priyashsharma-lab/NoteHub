package com.notehub.notehub.controller;

import com.notehub.notehub.dto.NoteDto;
import com.notehub.notehub.dto.NoteMapper;
import com.notehub.notehub.dto.NoteResponseDto;
import com.notehub.notehub.entity.Note;
import com.notehub.notehub.service.NoteService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@Validated
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class NoteController
{
    private final NoteService noteService;
    private final NoteMapper noteMapper;
    public NoteController(NoteService noteService, NoteMapper noteMapper)
    {
        this.noteService=noteService;
        this.noteMapper=noteMapper;
    }

    @PostMapping
    public ResponseEntity<NoteResponseDto> createNote(@Valid @RequestBody NoteDto noteDto)
    {
        Note createdNote=noteService.createNote(noteDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(noteMapper.toNoteResponseDto(createdNote));
    }

    @GetMapping
    public List<NoteResponseDto> getNotes()
    {
        return noteService.getAllNotes().stream().map(n->noteMapper.toNoteResponseDto(n)).toList();
    }

    @GetMapping("/{id}")
    public NoteResponseDto getNoteById(@Positive @PathVariable("id") Long id)
    {
       return noteMapper.toNoteResponseDto(noteService.getNoteById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteResponseDto> updateNote(@Positive @PathVariable("id") Long id, @Valid @RequestBody NoteDto noteDto)
    {
        Note updatedNote=noteService.updateNote(id,noteDto);
        return ResponseEntity.ok(noteMapper.toNoteResponseDto(updatedNote));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> trashNote(@Positive @PathVariable("id") Long id)
    {
        noteService.trashNote(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/trash")
    public List<NoteResponseDto> getDeletedNotes()
    {
        return noteService.getDeletedNotes().stream().map(n->noteMapper.toNoteResponseDto(n)).toList();
    }

    @PostMapping("/{id}/restore")
    public ResponseEntity<NoteResponseDto> restoreNote(@Positive @PathVariable("id") Long id)
    {
        return ResponseEntity.ok(noteMapper.toNoteResponseDto(noteService.restoreNote(id)));
    }

    @DeleteMapping("/{id}/forever")
    public ResponseEntity<Void> deleteNoteForever(@Positive @PathVariable("id") Long id)
    {
        noteService.deleteNoteForever(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/emptytrash")
    public ResponseEntity<Void> deleteAllTrashNotes()
    {
        noteService.deleteAllTrashNotes();
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<NoteResponseDto> archiveNote(@Positive @PathVariable("id") Long id)
    {
        Note note=noteService.archiveNote(id);
        return ResponseEntity.ok(noteMapper.toNoteResponseDto(note));
    }

    @PatchMapping("/{id}/unarchive")
    public ResponseEntity<NoteResponseDto> unarchiveNote(@Positive @PathVariable("id") Long id)
    {
        Note note=noteService.unarchiveNote(id);
        return ResponseEntity.ok(noteMapper.toNoteResponseDto(note));
    }

    @GetMapping("/archive")
    public List<NoteResponseDto> getAllArchivedNotes()
    {
        List<Note> notes=noteService.getAllArchiveNotes();
        return notes.stream().map((note)->noteMapper.toNoteResponseDto(note)).toList();
    }

    @PatchMapping("/{id}/pin")
    public ResponseEntity<NoteResponseDto> pinNote(@Positive @PathVariable("id") Long id)
    {
        Note note=noteService.pinNote(id);
        return ResponseEntity.ok(noteMapper.toNoteResponseDto(note));
    }

    @PatchMapping("/{id}/unpin")
    public ResponseEntity<NoteResponseDto> unpinNote(@Positive @PathVariable("id") Long id)
    {
        Note note=noteService.unpinNote(id);
        return ResponseEntity.ok(noteMapper.toNoteResponseDto(note));
    }
}
