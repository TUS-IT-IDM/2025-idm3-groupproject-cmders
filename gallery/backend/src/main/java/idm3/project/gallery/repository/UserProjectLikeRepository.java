package idm3.project.gallery.repository;

import idm3.project.gallery.model.Project;
import idm3.project.gallery.model.User;
import idm3.project.gallery.model.UserProjectLike;
import idm3.project.gallery.model.UserProjectLikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserProjectLikeRepository
        extends JpaRepository<UserProjectLike, UserProjectLikeId> {

    // Check if a like exists between user and project
    boolean existsByUserAndProject(User user, Project project);

    // Find a specific like
    Optional<UserProjectLike> findByUserAndProject(User user, Project project);

    // Count likes for a project
    long countByProject(Project project);

    // Delete by user and project (optional, if you want direct delete)
    void deleteByUserAndProject(User user, Project project);
}