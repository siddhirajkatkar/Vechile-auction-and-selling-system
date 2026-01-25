package com.project.base;

import org.modelmapper.ModelMapper;
//import org.modelmapper.Conditions;
//import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication
public class VechileAuctionProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(VechileAuctionProjectApplication.class, args);
		

//		@Bean//method level annotation - to declare a method returning java object
//		 ModelMapper modelMapper()
//		{
//			ModelMapper map=new ModelMapper();
//			//configure mapper - to transfer the matching props (name + data type)
//			map.getConfiguration()
//			.setMatchingStrategy(MatchingStrategies.STRICT)
//			//configure mapper - not to transfer nulls from src -> dest
//			.setPropertyCondition(Conditions.isNotNull());
//			return map;//Method rets configured ModelMapper bean to SC
//		}
//	
//		
//		@Bean 
//		public PasswordEncoder paswwordEncoder() {
//			return new BCryptPasswordEncoder();
//		}

	}
	
}
		

