package idm3.project.gallery.repository;

import idm3.project.gallery.model.UserProjectLike;
import idm3.project.gallery.model.UserProjectLikeId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProjectLikeRepository
        extends JpaRepository<UserProjectLike, UserProjectLikeId> {

    // quick helpers if you need them later
    long countByProjectId(Long projectId);
    boolean existsByUserIdAndProjectId(Long userId, Long projectId);
    void deleteByUserIdAndProjectId(Long userId, Long projectId);
}