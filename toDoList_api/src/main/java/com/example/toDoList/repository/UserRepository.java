package com.example.toDoList.repository;

import com.example.toDoList.model.ListUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<ListUser, Integer> {
    ListUser findByUserEmail(String userEmail);
}
