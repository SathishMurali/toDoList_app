package com.example.toDoList.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "toDoList")
public class TodoList {
    @Id
    @GeneratedValue
    private Integer listId;
    private String listName;
    private String listCategory;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userId")
    private ListUser listUser;
}
