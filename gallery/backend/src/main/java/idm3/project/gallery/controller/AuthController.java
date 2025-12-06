package idm3.project.gallery.controller;

import idm3.project.gallery.model.User;
import idm3.project.gallery.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User requestedUser, HttpSession session) {
        User authenticatedUser = userService.authenticate(
            requestedUser.getEmail(),
            requestedUser.getPassword()
        );

        if (authenticatedUser == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        session.setAttribute("loggedInUser", authenticatedUser);
        authenticatedUser.setPassword(null); // Hide password to user

        return ResponseEntity.ok(authenticatedUser);
    }

    // Check Session
    @GetMapping("/session")
    public ResponseEntity<?> checkSession(HttpSession session) {
        User user = (User) session.getAttribute("loggedInUser");

        if (user == null) {
            return ResponseEntity.status(401).body("Not logged in");
        }

        user.setPassword(null); // Hide password to user
        return ResponseEntity.ok(user);
    }

    // Logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out");
    }
}