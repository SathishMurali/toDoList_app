package com.example.toDoList.controller;

import com.example.toDoList.exception.ResourceNotFoundException;
import com.example.toDoList.model.ListUser;
import com.example.toDoList.response.APIResponse;
import com.example.toDoList.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<APIResponse> register(@RequestBody ListUser listUser){
        ListUser registeredUser = userService.registerAsUser(listUser);
        if (registeredUser == null){
            throw new ResourceNotFoundException("Unable to Register");
        }
        APIResponse apiResponse = new APIResponse();
        apiResponse.setStatus(HttpStatus.OK.value());
        apiResponse.setData(registeredUser);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<APIResponse> login(@RequestBody ListUser listUser){
        ListUser loggedInUser = userService.loginAsUser(listUser);
        if (loggedInUser == null){
            throw new ResourceNotFoundException("User not found");
        }
        APIResponse apiResponse = new APIResponse();
        apiResponse.setStatus(HttpStatus.OK.value());
        apiResponse.setData(loggedInUser);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
