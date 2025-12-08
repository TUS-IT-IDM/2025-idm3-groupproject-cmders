package idm3.project.gallery.repository;

import idm3.project.gallery.model.ShowcaseProject;
import idm3.project.gallery.model.ShowcaseProjectId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowcaseProjectRepository extends JpaRepository<ShowcaseProject, ShowcaseProjectId> {
    List<ShowcaseProject> findByShowcase_Id(Integer id);
}
