package com.example.toDoList.dataloader;

import com.example.toDoList.model.ListUser;
import com.example.toDoList.model.Role;
import com.example.toDoList.repository.RoleRepository;
import com.example.toDoList.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {
    private Boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    @Transactional
    public void onApplicationEvent(final ContextRefreshedEvent contextRefreshedEvent) {
        if (alreadySetup) {
            return;
        }
        Role userRole = createRoleIfNotFound(Role.ROLE_USER);
        Role adminRole = createRoleIfNotFound(Role.ROLE_ADMIN);

        createUserIfNotFound("admin@admin.com", adminRole);

        alreadySetup = true;
    }

    @Transactional
    private Role createRoleIfNotFound(final String name) {
        Role role = roleRepository.findByRoleName(name);
        if (role == null){
            role = new Role();
            role.setRoleName(name);
            role = roleRepository.save(role);
        }
        return role;
    }

    @Transactional
    private ListUser createUserIfNotFound(final String email, final Role role){
        ListUser user = userRepository.findByUserEmail(email);
        if (user == null){
            user = new ListUser(email, bCryptPasswordEncoder.encode("admin"));
            user.setRoles(List.of(role));
            user = userRepository.save(user);
        }
        return user;
    }
}
