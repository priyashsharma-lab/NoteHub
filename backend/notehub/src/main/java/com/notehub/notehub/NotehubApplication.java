package com.notehub.notehub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class NotehubApplication {

	public static void main(String[] args)
	{
		SpringApplication.run(NotehubApplication.class, args);
	}
}
