package com.example.toDoList.service;

import com.example.toDoList.model.ListUser;
import com.example.toDoList.model.Role;
import com.example.toDoList.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class ListUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        ListUser user = userRepository.findByUserEmail(userName);
        if (user != null){
            return new User(user.getUserEmail(), user.getPassword(), buildSimpleGrantedAuthorities(user.getRoles()));
        } else {
            throw new UsernameNotFoundException("User Not Found with Username: " + userName);
        }
    }

    private List<SimpleGrantedAuthority> buildSimpleGrantedAuthorities(final List<Role> roles) {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (Role role : roles){
            authorities.add(new SimpleGrantedAuthority("ROLE_: " + role.getRoleName()));
        }
        return authorities;
    }
}
