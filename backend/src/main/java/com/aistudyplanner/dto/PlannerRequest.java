package com.aistudyplanner.dto;

import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class PlannerRequest {
    private String subjectName;
    private String topicName;
    private LocalDate scheduledDate;
    private LocalTime startTime;
    private Integer durationMinutes;
}
