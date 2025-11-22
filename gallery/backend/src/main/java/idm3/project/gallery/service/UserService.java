package idm3.project.gallery.service;
import idm3.project.gallery.model.User;
import idm3.project.gallery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() { return (List<User>) userRepository.findAll(); }

    // Authenticate user
    public User authenticate(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    // Register a new user
    public boolean registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail()) || userRepository.existsByEmail(user.getEmail())) {
            return false; // User already exists
        }
        userRepository.save(user);
        return true;
    }
}