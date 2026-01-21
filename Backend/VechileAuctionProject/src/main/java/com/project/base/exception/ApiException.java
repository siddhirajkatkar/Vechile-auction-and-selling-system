package com.project.base.exception;

public class ApiException extends Exception {
		private String message;
		
		public ApiException(String message) {
			super(message);			
		}
}
