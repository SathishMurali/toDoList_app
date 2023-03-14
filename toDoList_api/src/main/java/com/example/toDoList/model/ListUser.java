package com.example.toDoList.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@ToString
@Table(name = "users")
public class ListUser {

    @Id
    @GeneratedValue
    private Integer userId;
    private String firstName;
    private String lastName;
    private String userEmail;
    private String password;

    public ListUser() {
    }

    public ListUser(String userEmail, String password) {
        this.userEmail = userEmail;
        this.password = password;
    }

    @ManyToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    @JoinTable(joinColumns = {@JoinColumn(name = "userId", referencedColumnName = "userId")},
            inverseJoinColumns = {@JoinColumn(name = "roleId", referencedColumnName = "roleId")})
    private List<Role> roles;

    @JsonIgnore
    @OneToMany(mappedBy = "listUser")
    private List<TodoList> todoLists;
}
