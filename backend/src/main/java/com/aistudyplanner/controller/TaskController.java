package com.aistudyplanner.controller;

import com.aistudyplanner.dto.TaskDTO;
import com.aistudyplanner.entity.Task;
import com.aistudyplanner.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> getUserTasks(@RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(taskService.getTasksByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody TaskDTO dto) {
        return ResponseEntity.ok(taskService.createTask(dto));
    }
}
