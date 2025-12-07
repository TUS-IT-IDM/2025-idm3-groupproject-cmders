package idm3.project.gallery.repository;

import idm3.project.gallery.model.FavouriteProject;
import idm3.project.gallery.model.FavouriteProjectId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouriteProjectRepository extends JpaRepository<FavouriteProject, FavouriteProjectId> {
    List<FavouriteProject> findByUser_Id(Integer id);
}
