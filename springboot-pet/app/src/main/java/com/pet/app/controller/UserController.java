package com.pet.app.controller;

import com.pet.app.model.User;
import com.pet.app.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody User user) {

        if (userService.register(user) != null) {
            return "Înregistrare reușită";
        } else {
            return "Înregistrare eșuată";
        }
    }


    @GetMapping("/user")
    public String getUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            User user = (User) session.getAttribute("user");
            if (user != null) {
                return "Utilizator autentificat: " + user.getEmail() + " " +  user.getFirstName() + " " + user.getLastName();
            }
        }
        return "Niciun utilizator autentificat";
    }

    @PostMapping("/logout")
    public String logout(HttpSession session) {
        if(session != null) {
            session.invalidate();
            return "Deconectare reușită";
        }
        else
        {
            return "Niciun utilizator autentificat";
        }
    }

    @GetMapping("/account")
    public ResponseEntity<User> getAuthenticatedUser(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}



