package com.aistudyplanner.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
public class OpenAIConfig {
    @Value("${openai.api.key:demo-openai-key}")
    private String apiKey;

    @Value("${openai.model:gpt-4o-mini}")
    private String model;
}
