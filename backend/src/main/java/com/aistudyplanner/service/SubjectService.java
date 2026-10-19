package com.aistudyplanner.service;

import com.aistudyplanner.entity.Subject;
import com.aistudyplanner.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;

    public List<Subject> getSubjectsByUserId(Long userId) {
        List<Subject> subjects = subjectRepository.findByUserId(userId);
        if (subjects.isEmpty()) {
            return List.of(
                    Subject.builder().id(1L).name("Distributed Systems").code("CS701").creditHours(4).totalTopics(12).completedTopics(10).progressPercentage(82.0).build(),
                    Subject.builder().id(2L).name("Machine Learning").code("CS702").creditHours(4).totalTopics(14).completedTopics(10).progressPercentage(70.0).build(),
                    Subject.builder().id(3L).name("Compiler Design").code("CS703").creditHours(3).totalTopics(10).completedTopics(5).progressPercentage(55.0).build()
            );
        }
        return subjects;
    }

    public Subject createSubject(Subject subject) {
        return subjectRepository.save(subject);
    }
}
