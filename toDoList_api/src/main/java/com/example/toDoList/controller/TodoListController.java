package com.example.toDoList.controller;

import com.example.toDoList.model.TodoList;
import com.example.toDoList.request.TodoListRequest;
import com.example.toDoList.response.APIResponse;
import com.example.toDoList.service.TodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/toDoList")
public class TodoListController {
    @Autowired
    private TodoListService todoListService;

    @Autowired
    private APIResponse apiResponse;

    @PostMapping("/add")
    public ResponseEntity<APIResponse> addList(@RequestBody TodoListRequest todoListRequest){
        List<TodoList> todoLists = todoListService.addList(todoListRequest);

        apiResponse.setStatus(HttpStatus.OK.value());
        apiResponse.setData(todoLists);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<APIResponse> updateList (@RequestBody TodoListRequest todoListRequest){
        List<TodoList> todoLists = todoListService.updateList(todoListRequest);

        apiResponse.setStatus(HttpStatus.OK.value());
        apiResponse.setData(todoLists);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<APIResponse> getAll(@PathVariable Integer userId){

        apiResponse.setStatus(HttpStatus.OK.value());
        apiResponse.setData(todoListService.getAll(userId));
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{listId}")
    public ResponseEntity<APIResponse> deleteList (@PathVariable Integer listId){
        List<TodoList> todoLists = todoListService.deleteList(listId);

        apiResponse.setStatus(HttpStatus.OK.value());
        apiResponse.setData(todoLists);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
