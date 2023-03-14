package com.example.toDoList.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoListRequest {
    private Integer listId;
    private String listName;
    private String listCategory;
    private Integer userId;
}
