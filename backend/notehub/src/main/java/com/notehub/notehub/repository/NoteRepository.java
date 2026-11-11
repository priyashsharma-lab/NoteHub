package com.notehub.notehub.repository;

import com.notehub.notehub.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note,Long>
{

}
