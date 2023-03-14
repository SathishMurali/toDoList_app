package com.example.toDoList.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Role {

    public static final String ROLE_USER = "USER";
    public static final String ROLE_ADMIN = "ADMIN";

    @Id
    @GeneratedValue
    private Integer roleId;
    private String roleName;

    @ManyToMany(mappedBy = "roles", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<ListUser> users;
}
