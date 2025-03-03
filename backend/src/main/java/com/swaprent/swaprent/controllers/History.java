package com.swaprent.swaprent.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class History {

    @GetMapping("history")
    public String  history() {
        return "components/history";
    }
}
