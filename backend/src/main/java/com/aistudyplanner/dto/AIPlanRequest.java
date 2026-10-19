package com.aistudyplanner.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class AIPlanRequest {
    private LocalDate targetExamDate;
    private Double dailyAvailableHours;
    private String studyStrategy;
    private String preferredTime;
    private String goal;
}
