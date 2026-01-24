package com.project.base.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http

            // Disable CSRF (JWT-based auth)

            // ✅ ENABLE CORS (THIS WAS MISSING)
            .cors(cors -> {})

            // Disable CSRF
            .csrf(csrf -> csrf.disable())

            // Stateless session
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // Authorization rules
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/auth/login",
                    "/user/register",
                    "/user/ping",
                    "/v3/api-docs/**",
                    "/swagger-ui/**",
                    "/swagger-ui.html"
                ).permitAll()
                .anyRequest().authenticated()
            )

            // Disable default login mechanisms
            .httpBasic(httpBasic -> httpBasic.disable())
            .formLogin(form -> form.disable());

        // Register JWT filter
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /**
     * ✅ THIS IS THE FIX
     * Expose AuthenticationManager as a Spring bean
     * 
Parameter 0 of constructor in com.project.base.services.impl.AuthServiceImpl required a bean of type 'org.springframework.security.authentication.AuthenticationManager' that could not be found.


Action:

Consider defining a bean of type 'org.springframework.security.authentication.AuthenticationManager' in your configuration.

     */
    
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}


