package com.example.toDoList.service;

import com.example.toDoList.exception.UserExistException;
import com.example.toDoList.model.ListUser;
import com.example.toDoList.model.Role;
import com.example.toDoList.repository.RoleRepository;
import com.example.toDoList.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    public ListUser registerAsUser(ListUser listUser){
        ListUser registeredUser = userRepository.findByUserEmail(listUser.getUserEmail());
        if (registeredUser != null){
            throw new UserExistException("User Already Exist!");
        }
        Role role = roleRepository.findByRoleName(Role.ROLE_USER);
        listUser.setRoles(List.of(role));
        listUser.setPassword(bCryptPasswordEncoder.encode(listUser.getPassword()));
        return userRepository.save(listUser);
    }

    public ListUser loginAsUser(ListUser listUser){
        ListUser user = userRepository.findByUserEmail(listUser.getUserEmail());
        if (user != null && bCryptPasswordEncoder.matches(listUser.getPassword(), user.getPassword())){
            return user;
        }
        return null;
    }
}
