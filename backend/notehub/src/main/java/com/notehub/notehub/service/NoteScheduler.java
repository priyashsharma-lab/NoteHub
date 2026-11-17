package com.notehub.notehub.service;

import com.notehub.notehub.repository.NoteRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Component
public class NoteScheduler
{
    private final NoteRepository noteRepository;
    private final static Logger log=LoggerFactory.getLogger(NoteScheduler.class);
    public NoteScheduler(NoteRepository noteRepository)
    {
        this.noteRepository=noteRepository;
    }
    @Scheduled(fixedDelayString = "${note.cleanup.delay:1}", timeUnit = TimeUnit.HOURS)
    @Transactional
    public void trashNotePeriodicCleanUp()
    {
        LocalDateTime sevenDaysAgo = LocalDateTime.now().minusDays(7);
        int deletedCount = noteRepository.deleteExpiredNotes(sevenDaysAgo);

        if (deletedCount > 0)
        {
            log.info("Permanently deleted {} expired notes.", deletedCount);
        }
    }
}
