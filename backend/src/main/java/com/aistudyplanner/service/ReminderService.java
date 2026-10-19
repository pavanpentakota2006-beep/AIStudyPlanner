package com.aistudyplanner.service;

import com.aistudyplanner.entity.Reminder;
import com.aistudyplanner.repository.ReminderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReminderService {

    private final ReminderRepository reminderRepository;

    public List<Reminder> getPendingReminders(Long userId) {
        List<Reminder> reminders = reminderRepository.findByUserIdAndSentFalse(userId);
        if (reminders.isEmpty()) {
            return List.of(
                    Reminder.builder().id(1L).message("Distributed Systems Revision starting in 10 mins").reminderTime(LocalDateTime.now().plusMinutes(10)).sent(false).build()
            );
        }
        return reminders;
    }
}
