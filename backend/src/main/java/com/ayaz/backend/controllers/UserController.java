package com.ayaz.backend.controllers;

import com.ayaz.backend.models.User;
import com.ayaz.backend.models.UserDto;
import com.ayaz.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserRepository userRepository;

    @GetMapping
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable int id) {
        return userRepository.findById(new Long(id));
    }

    @PutMapping
    public String updateUser( @RequestBody UserDto userDto) {
        System.out.println(userDto.getId());
        Optional<User> user=userRepository.findById(userDto.getId());
        if(user.isPresent()) {
            User user2=user.get();
            user2.setFirstname(userDto.getFirstname());
            user2.setLastname(userDto.getLastname());
            user2.setEmail(userDto.getEmail());
            user2.setBirth_date(userDto.getBirth_date());
            userRepository.save(user2);
            return "ok";
        }
        else
            return" error";
    }
}
