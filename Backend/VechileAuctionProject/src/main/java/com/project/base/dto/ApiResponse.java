package com.project.base.dto;

public class ApiResponse extends Exception {
	private String message;
	public ApiResponse(String message) {
		this.message=message;
	}
}
