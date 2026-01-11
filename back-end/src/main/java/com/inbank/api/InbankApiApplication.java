package com.inbank.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.util.Collections;

@SpringBootApplication
public class InbankApiApplication {

	public static void main(String[] args) {
        SpringApplication app = new SpringApplication(InbankApiApplication.class);

        // Handle running from project root where compose.yaml is inside the module
        File composeFile = new File("compose.yaml");
        File moduleComposeFile = new File("back-end/compose.yaml");

        if (!composeFile.exists() && moduleComposeFile.exists()) {
            app.setDefaultProperties(Collections.singletonMap("spring.docker.compose.file", "back-end/compose.yaml"));
        }

        app.run(args);
    }

}
