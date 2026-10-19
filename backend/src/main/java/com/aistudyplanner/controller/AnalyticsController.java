package com.aistudyplanner.controller;

import com.aistudyplanner.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/overview")
    public ResponseEntity<Map<String, Object>> getOverview(@RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(analyticsService.getUserAnalytics(userId));
    }
}
