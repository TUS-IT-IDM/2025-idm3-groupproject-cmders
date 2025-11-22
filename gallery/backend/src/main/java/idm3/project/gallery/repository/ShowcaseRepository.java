package idm3.project.gallery.repository;

import idm3.project.gallery.model.Showcase;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface ShowcaseRepository extends ListCrudRepository<Showcase, Integer> {
    List<Showcase> findByTheme_NameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
}