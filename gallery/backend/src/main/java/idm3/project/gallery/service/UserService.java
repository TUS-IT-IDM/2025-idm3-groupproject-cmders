package idm3.project.gallery.service;
import idm3.project.gallery.model.FavouriteProject;
import idm3.project.gallery.model.FavouriteProjectId;
import idm3.project.gallery.model.Showcase;
import idm3.project.gallery.model.User;
import idm3.project.gallery.repository.FavouriteProjectRepository;
import idm3.project.gallery.repository.ProjectRepository;
import idm3.project.gallery.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private static final String UPLOAD_DIR = "uploads/images/users/";

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FavouriteProjectRepository favouriteProjectRepository;
    @Autowired
    private ProjectRepository projectRepository;

    public Optional<User> get(Integer user) {
        return userRepository.findById(user);
    }

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

    public void unfavourite(Integer userId, Integer projectId) {
        var id = new FavouriteProjectId();
        id.setUser(userId);
        id.setProject(projectId);
        favouriteProjectRepository.deleteById(id);
    }

    public User authenticate(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    public void save(User incoming, MultipartFile file) throws IOException {
        User user;

        // Case 1: Update existing
        if (incoming.getId() != null) {
            user = get(incoming.getId())
                    .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + incoming.getId()));
        }
        // Case 2: Create new
        else {
            user = new User();
        }

        // Set properties from an incoming object
        user.setType(incoming.getType());
        user.setFirstName(incoming.getFirstName());
        user.setLastName(incoming.getLastName());
        user.setEmail(incoming.getEmail());
        user.setPassword(incoming.getPassword());

        // Upload file
        String uploadedFileName = handleFile(file);
        if (uploadedFileName != null) {
            user.setProfilePicture(uploadedFileName);
        }

        userRepository.save(user);
    }

    public String handleFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        Files.createDirectories(Paths.get(UPLOAD_DIR));

        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);
        Files.write(filePath, file.getBytes());

        return fileName;
    }
}