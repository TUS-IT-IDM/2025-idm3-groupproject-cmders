package idm3.project.gallery.service;

import idm3.project.gallery.model.*;
import idm3.project.gallery.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class LikeService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final UserProjectLikeRepository likeRepository;

    public LikeService(UserRepository userRepository,
                       ProjectRepository projectRepository,
                       UserProjectLikeRepository likeRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.likeRepository = likeRepository;
    }

    /* ---------- PUBLIC API ---------- */

    public boolean likeProject(Integer userId, Integer projectId) {
        User user = fetchEmployer(userId);
        Project project = fetchProject(projectId);

        if (likeRepository.existsByUserAndProject(user, project)) {
            return false;                     // already liked – silently ignore
        }

        UserProjectLike like = new UserProjectLike(user, project);
        likeRepository.save(like);            // cascades into user/project sets
        return true;
    }

    public boolean unlikeProject(Integer userId, Integer projectId) {
        User user = fetchEmployer(userId);
        Project project = fetchProject(projectId);

        return likeRepository.findByUserAndProject(user, project)
                .map(like -> {    // existing like found
                    likeRepository.delete(like);
                    return true;
                })
                .orElse(false);  // nothing to delete
    }

    public List<Project> getLikedProjectsForEmployer(Integer userId) {
        User employer = fetchEmployer(userId);
        return projectRepository.findProjectsLikedByUserOrderByCreatedDesc(employer);
    }

    public boolean hasEmployerLikedProject(Integer userId, Integer projectId) {
        User employer = fetchEmployer(userId);
        Project project = fetchProject(projectId);
        return likeRepository.existsByUserAndProject(employer, project);
    }

    public long getLikeCount(Integer projectId) {
        Project project = fetchProject(projectId);
        return likeRepository.countByProject(project);
    }

    /* ---------- INTERNAL HELPERS ---------- */

    private User fetchEmployer(Integer userId) {
        return userRepository.findById(userId)
                .filter(u -> u.getType() == User.Type.Employer)
                .orElseThrow(() ->
                        new IllegalStateException("Operation allowed only for Employer users"));
    }

    private Project fetchProject(Integer projectId) {
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));
    }
}