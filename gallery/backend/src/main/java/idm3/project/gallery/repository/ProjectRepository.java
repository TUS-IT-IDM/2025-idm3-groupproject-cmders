package idm3.project.gallery.repository;

import idm3.project.gallery.model.Project;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ProjectRepository extends ListCrudRepository<Project, Integer> {
}

