package com.aistudyplanner.controller;

import com.aistudyplanner.entity.Subject;
import com.aistudyplanner.service.SubjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/subjects")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;

    @GetMapping
    public ResponseEntity<List<Subject>> getUserSubjects(@RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(subjectService.getSubjectsByUserId(userId));
    }

    @PostMapping
    public ResponseEntity<Subject> createSubject(@RequestBody Subject subject) {
        return ResponseEntity.ok(subjectService.createSubject(subject));
    }
}
