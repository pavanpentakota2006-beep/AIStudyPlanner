package com.aistudyplanner.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private LocalDate dueDate;
    private String priority;
    private Integer difficulty;
    private Boolean completed;
    private String subjectName;
}
