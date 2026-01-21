package com.project.base.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF for API endpoints
            .csrf(csrf -> csrf.disable())
            
            // Configure endpoint access
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/user/login",
                    "/user/ping",
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html"
                ).permitAll() // allow these endpoints without login
                .anyRequest().authenticated() // everything else requires auth
            )
            
            // Enable HTTP Basic for protected endpoints
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}
