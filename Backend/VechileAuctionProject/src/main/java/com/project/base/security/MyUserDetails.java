package com.project.base.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;


public class MyUserDetails implements UserDetails{

	

	    private final Long id;
	    private final String username;
	    private final String password;
	    private final Collection<? extends GrantedAuthority> authorities;

	    public MyUserDetails(Long id, String username, String password,
	                         Collection<? extends GrantedAuthority> authorities) {
	        this.id = id;
	        this.username = username;
	        this.password = password;
	        this.authorities = authorities;
	    }

	    public Long getId() {
	        return id; // custom getter for user ID
	    }

	    @Override
	    public Collection<? extends GrantedAuthority> getAuthorities() {
	        return authorities;
	    }

	    @Override
	    public String getPassword() {
	        return password;
	    }

	    @Override
	    public String getUsername() {
	        return username;
	    }

	    @Override
	    public boolean isAccountNonExpired() {
	        return true; // return false to block login when expired
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        return true; // return false to block login when locked
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true; // return false if credentials have expired
	    }

	    @Override
	    public boolean isEnabled() {
	        return true; // return false to disable user
	    }
	}


