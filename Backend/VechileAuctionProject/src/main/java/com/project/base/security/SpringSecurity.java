//package com.project.base.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//@EnableWebSecurity
//@Configuration
//public class SpringSecurity {
//	
//	@Autowired
//	private UserDetailsService userDetailsService;
//	@Autowired
//	private JwtFilter jwtFilter;
//	@Bean
//	PasswordEncoder passwordEncode() {
//		return new BCryptPasswordEncoder();
//	}
//	@Bean
//	AuthenticationManager authenticationManager(HttpSecurity http)throws Exception {
//		AuthenticationManagerBuilder authManagerBuilder=http.getSharedObject(AuthenticationManagerBuilder.class);
//		authManagerBuilder.userDetailsService(userDetailsService);
//		return authManagerBuilder.build();
//	}
//	
//	@Bean
//	SecurityFilterChain authorizeRequest(HttpSecurity http)throws Exception{
//		http 
//		     .csrf(csrf->csrf.disable())
//		     .authorizeHttpRequests(requests->requests
//		    		 .requestMatchers("")
//		    		 )
//		return ;
//	}
//		
//	
//	
//	
//
//	
//}
