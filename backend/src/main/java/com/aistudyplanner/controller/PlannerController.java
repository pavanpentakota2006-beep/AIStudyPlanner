package com.aistudyplanner.controller;

import com.aistudyplanner.entity.StudyPlan;
import com.aistudyplanner.service.PlannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/planner")
@RequiredArgsConstructor
public class PlannerController {

    private final PlannerService plannerService;

    @GetMapping
    public ResponseEntity<List<StudyPlan>> getPlans(@RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(plannerService.getPlansByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<StudyPlan> createPlan(@RequestBody StudyPlan plan) {
        return ResponseEntity.ok(plannerService.createPlan(plan));
    }
}
