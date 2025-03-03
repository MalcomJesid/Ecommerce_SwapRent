package com.swaprent.swaprent.controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Home {

    @GetMapping("/")
    public String home() {
        return "base/index";
    }

    @GetMapping("offer")
    public String offer() {
        return "components/offer";
    }

    @GetMapping("category")
    public String category() {
        return "components/category";
    }

    @GetMapping("rent")
    public String  rent() {
        return "components/rent";
    }

    @GetMapping("swap")
    public String  swap() {
        return "components/swap";
    }

    @GetMapping("account")
    public String account() {
    return "components/account";
    }

    @GetMapping("favorite")
    public String favorite(){
    return "components/favorite";
    }
}
