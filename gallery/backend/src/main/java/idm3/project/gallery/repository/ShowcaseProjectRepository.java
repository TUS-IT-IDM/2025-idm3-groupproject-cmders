package idm3.project.gallery.repository;

import idm3.project.gallery.model.ShowcaseProject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShowcaseProjectRepository extends JpaRepository<ShowcaseProject, Integer> {
    List<ShowcaseProject> findByShowcaseId(Integer id);
}
