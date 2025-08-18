package com.examly.springapp.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI giftApplicationOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Gift Application API")
                        .description("OpenAPI documentation for the Gift Application backend.")
                        .version("v1")
                        .contact(new Contact()
                                .name("Gift App Team")
                                .email("support@giftapp.local"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0"))
                );
    }
}


