package idm3.project.gallery.repository;

import idm3.project.gallery.model.Theme;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThemeRepository extends ListCrudRepository<Theme, Integer> {
}
