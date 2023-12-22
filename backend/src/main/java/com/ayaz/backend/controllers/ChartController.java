package com.ayaz.backend.controllers;

import com.ayaz.backend.models.ChartDto;
import com.ayaz.backend.security.services.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/chart")
public class ChartController {
    @Autowired
    ChartService chartService;

    @GetMapping
    public ChartDto getInfo() {
        return chartService.chart();
    }



}