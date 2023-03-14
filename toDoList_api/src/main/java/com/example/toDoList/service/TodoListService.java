package com.example.toDoList.service;

import com.example.toDoList.exception.ResourceNotFoundException;
import com.example.toDoList.model.ListUser;
import com.example.toDoList.model.TodoList;
import com.example.toDoList.repository.TodoListRepository;
import com.example.toDoList.repository.UserRepository;
import com.example.toDoList.request.TodoListRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoListService {
    @Autowired
    private TodoListRepository todoListRepository;

    @Autowired
    private UserRepository userRepository;

    private ListUser getListUser(Integer userId){
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User does not exists!"));
    }

    public List<TodoList> getAll(Integer listId){
        ListUser listUser = getListUser(listId);
        return todoListRepository.findByListUser(listUser);
    }

    public List<TodoList> addList(TodoListRequest todoListRequest){
        TodoList todoList = new TodoList();
        todoList.setListName(todoListRequest.getListName());
        todoList.setListCategory(todoListRequest.getListCategory());
        todoList.setListUser(getListUser(todoListRequest.getUserId()));
        todoListRepository.save(todoList);

        return getAll(todoListRequest.getUserId());
    }

    public List<TodoList> updateList (TodoListRequest todoListRequest){
        if (todoListRequest != null && todoListRequest.getListId() != null){
            TodoList todoList = new TodoList();
            todoList.setListId(todoListRequest.getListId());
            todoList.setListName(todoListRequest.getListName());
            todoList.setListCategory(todoListRequest.getListCategory());
            todoList.setListUser(getListUser(todoListRequest.getUserId()));
            todoListRepository.save(todoList);
        } else {
            throw new ResourceNotFoundException("List does not exists!");
        }
        return getAll(todoListRequest.getUserId());
    }

    public List<TodoList> deleteList(Integer listId){
        TodoList todoList = todoListRepository.findById(listId)
                .orElseThrow(() -> new RuntimeException("List does not exists"));
        todoListRepository.delete(todoList);
        return todoListRepository.findByListUser(todoList.getListUser());
    }
}
