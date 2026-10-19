package com.aistudyplanner.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "study_plans")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudyPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subjectName;
    private String topicName;
    private LocalDate scheduledDate;
    private LocalTime startTime;
    private Integer durationMinutes;

    @Enumerated(EnumType.STRING)
    private PlanStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public enum PlanStatus {
        SCHEDULED, IN_PROGRESS, COMPLETED, SKIPPED
    }
}
