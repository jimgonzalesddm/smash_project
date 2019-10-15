package com.zuitt.smash;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication( exclude = { SecurityAutoConfiguration.class } )
public class SmashApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmashApplication.class, args);
	}

}
