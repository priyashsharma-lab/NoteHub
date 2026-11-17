package com.notehub.notehub.repository;

import com.notehub.notehub.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note,Long>
{
    public List<Note> findByDeletedAtIsNull();
    public List<Note> findByDeletedAtIsNotNull();
    public Optional<Note> findByIdAndDeletedAtIsNull(Long id);
    public void deleteByDeletedAtIsNotNull();
    @Modifying
    @Query("DELETE FROM Note n WHERE n.deletedAt IS NOT NULL AND n.deletedAt <= :cutoff")
    int deleteExpiredNotes(@Param("cutoff") LocalDateTime cutoff);
}
