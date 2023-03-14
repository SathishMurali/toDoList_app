package com.example.toDoList.repository;

import com.example.toDoList.model.ListUser;
import com.example.toDoList.model.TodoList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoListRepository extends JpaRepository<TodoList, Integer> {
    List<TodoList> findByListUser(ListUser listUser);
}
