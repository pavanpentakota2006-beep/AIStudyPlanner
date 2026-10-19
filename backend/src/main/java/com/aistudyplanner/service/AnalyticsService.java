package com.aistudyplanner.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    public Map<String, Object> getUserAnalytics(Long userId) {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("weeklyHoursSpent", 28.5);
        analytics.put("targetHours", 28.0);
        analytics.put("completionRatePercentage", 88.4);
        analytics.put("streakDays", 7);
        analytics.put("topSubject", "Distributed Systems");
        analytics.put("productivityGain", 24.0);
        return analytics;
    }
}
