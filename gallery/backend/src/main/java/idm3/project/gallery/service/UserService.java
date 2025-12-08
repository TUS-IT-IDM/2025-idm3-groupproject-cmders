package idm3.project.gallery.service;
import idm3.project.gallery.model.FavouriteProject;
import idm3.project.gallery.model.FavouriteProjectId;
import idm3.project.gallery.model.User;
import idm3.project.gallery.repository.FavouriteProjectRepository;
import idm3.project.gallery.repository.ProjectRepository;
import idm3.project.gallery.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FavouriteProjectRepository favouriteProjectRepository;
    @Autowired
    private ProjectRepository projectRepository;

    public List<User> findAll() { return userRepository.findAll(); }

    public List<FavouriteProject> getFavourites(Integer id) {
        return favouriteProjectRepository.findByUser_Id(id);
    }

    public void favourite(Integer userId, Integer projectId) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        var project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));

        var id = new FavouriteProjectId();
        id.setUser(userId);
        id.setProject(projectId);

        var favourite = new FavouriteProject();
        favourite.setId(id);
        favourite.setUser(user);
        favourite.setProject(project);

        favouriteProjectRepository.save(favourite);
    }

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