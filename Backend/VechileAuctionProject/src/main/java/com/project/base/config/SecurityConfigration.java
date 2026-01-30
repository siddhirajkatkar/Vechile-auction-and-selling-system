package com.project.base.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
@Configuration
public class SecurityConfigration {
    @Bean
    //method level annotation - to declare a method returning java object
		public ModelMapper modelMapper()
		{
			ModelMapper map=new ModelMapper();
			//configure mapper - to transfer the matching props (name + data type)
			map.getConfiguration()
			.setMatchingStrategy(MatchingStrategies.STRICT)
			//configure mapper - not to transfer nulls from src -> dest
			.setPropertyCondition(Conditions.isNotNull());
			return map;//Method rets configured ModelMapper bean to SC
		}
}

