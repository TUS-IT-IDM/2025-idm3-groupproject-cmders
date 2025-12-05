package idm3.project.gallery.repository;

import idm3.project.gallery.model.Project;
import idm3.project.gallery.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Integer> {

    @Query("SELECT DISTINCT p FROM Project p " +
            "JOIN UserProjectLike upl ON upl.project = p " +
            "WHERE upl.user = :user " +
            "ORDER BY p.created DESC")
    List<Project> findProjectsLikedByUserOrderByCreatedDesc(@Param("user") User user);
}