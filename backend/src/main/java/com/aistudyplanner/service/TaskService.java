package com.aistudyplanner.service;

import com.aistudyplanner.dto.TaskDTO;
import com.aistudyplanner.entity.Task;
import com.aistudyplanner.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public List<Task> getTasksByUserId(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        if (tasks.isEmpty()) {
            return List.of(
                    Task.builder().id(101L).title("Paxos vs Raft Leader Election Comparison Paper").priority(Task.Priority.HIGH).dueDate(LocalDate.now().plusDays(2)).difficulty(4).completed(false).build(),
                    Task.builder().id(102L).title("Implement Backpropagation Algorithm in Python").priority(Task.Priority.HIGH).dueDate(LocalDate.now().plusDays(3)).difficulty(5).completed(false).build(),
                    Task.builder().id(103L).title("Construct LALR(1) Parsing Table for Expression Grammar").priority(Task.Priority.MEDIUM).dueDate(LocalDate.now().plusDays(5)).difficulty(3).completed(false).build()
            );
        }
        return tasks;
    }

    public Task createTask(TaskDTO dto) {
        Task task = Task.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .dueDate(dto.getDueDate())
                .priority(Task.Priority.valueOf(dto.getPriority()))
                .difficulty(dto.getDifficulty())
                .completed(false)
                .build();
        return taskRepository.save(task);
    }
}
