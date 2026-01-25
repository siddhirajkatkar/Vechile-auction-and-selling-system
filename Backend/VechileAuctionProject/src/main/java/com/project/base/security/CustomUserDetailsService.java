//package com.project.base.security;
//
//	import java.util.stream.Collectors;
//	import org.springframework.security.core.authority.SimpleGrantedAuthority;
//	import org.springframework.security.core.userdetails.*;
//	import org.springframework.stereotype.Service;
//	import com.project.base.pojo.User;
//	import com.project.base.repository.UserRepository;
//
//	
//	public class CustomUserDetailsService implements UserDetailsService {
//
//	    private final UserRepository userRepository;
//
//	    public CustomUserDetailsService(UserRepository userRepository) {
//	        this.userRepository = userRepository;
//	    }
//
//	    @Override
//	    public UserDetails loadUserByUsername(String email)
//	            throws UsernameNotFoundException {
//
//	        User user = userRepository.findByEmail(email)
//	                .orElseThrow(() ->
//	                        new UsernameNotFoundException("User not found"));
//
//	        return new MyUserDetails(
//	                user.getId(),
//	                user.getEmail(),
//	                user.getPassword(),
//	                user.getRoles().stream()
//	                        .map(r -> new SimpleGrantedAuthority(r.getRoleName().name()))
//	                        .collect(Collectors.toList()) 
//	        );
//	    }
//	}
//
//
