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
    public ResponseEntity<Void> deleteNote(@Positive @PathVariable("id") Long id)
    {
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
}
