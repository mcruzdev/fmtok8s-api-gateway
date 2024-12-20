package com.salaboy.conferences.site.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Configuration
public class WebEndpoints {

    private static final Logger log = LoggerFactory.getLogger(WebEndpoints.class);

    @Bean
    public RouterFunction<ServerResponse> indexRouter() {
        return route()
                .GET("/proposals-page", request ->
                        ServerResponse.ok().contentType(MediaType.TEXT_HTML).bodyValue(getIndexPage()))
                .GET("/speakers-page", request ->
                        ServerResponse.ok().contentType(MediaType.TEXT_HTML).bodyValue(getIndexPage()))
                .GET("/back-office-page", request ->
                        ServerResponse.ok().contentType(MediaType.TEXT_HTML).bodyValue(getIndexPage()))
                .GET("/back-office-page/features", request ->
                        ServerResponse.ok().contentType(MediaType.TEXT_HTML).bodyValue(getIndexPage()))
                .GET("/back-office-page/proposals", request ->
                        ServerResponse.ok().contentType(MediaType.TEXT_HTML).bodyValue(getIndexPage()))
                .GET("/agenda-page", request ->
                        ServerResponse.ok().contentType(MediaType.TEXT_HTML).bodyValue(getIndexPage()))
                .GET("/sponsors-page", request ->
                        ServerResponse.ok().contentType(MediaType.TEXT_HTML).bodyValue(getIndexPage()))
                .GET("/about-page", request ->
                        ServerResponse.ok().contentType(MediaType.TEXT_HTML).bodyValue(getIndexPage()))
                .build();
    }

    private Object getIndexPage() {
        var indexPage = new ClassPathResource("file:static/index.html");
        if (!indexPage.exists()) {
            // This should only happen when running the app locally in development mode.
            return "The 'index.html' page doesn't exist.";
        }
        return indexPage;
    }

}
