package com.aistudyplanner.service;

import com.aistudyplanner.entity.StudyPlan;
import com.aistudyplanner.repository.StudyPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlannerService {

    private final StudyPlanRepository studyPlanRepository;

    public List<StudyPlan> getPlansByUserId(Long userId) {
        List<StudyPlan> plans = studyPlanRepository.findByUserId(userId);
        if (plans.isEmpty()) {
            return List.of(
                    StudyPlan.builder().id(1L).subjectName("Distributed Systems").topicName("Consensus Algorithms (Raft & Paxos)").scheduledDate(LocalDate.now()).startTime(LocalTime.of(9, 0)).durationMinutes(90).status(StudyPlan.PlanStatus.SCHEDULED).build(),
                    StudyPlan.builder().id(2L).subjectName("Machine Learning").topicName("Gradient Descent Optimization").scheduledDate(LocalDate.now()).startTime(LocalTime.of(14, 0)).durationMinutes(60).status(StudyPlan.PlanStatus.SCHEDULED).build(),
                    StudyPlan.builder().id(3L).subjectName("Compiler Design").topicName("LALR Parsing Tables & AST").scheduledDate(LocalDate.now().plusDays(1)).startTime(LocalTime.of(10, 30)).durationMinutes(120).status(StudyPlan.PlanStatus.SCHEDULED).build()
            );
        }
        return plans;
    }

    public StudyPlan createPlan(StudyPlan plan) {
        return studyPlanRepository.save(plan);
    }
}
