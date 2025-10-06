package idm3.project.gallery.repository;

import idm3.project.gallery.model.Project;
import idm3.project.gallery.model.Showcase;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ShowcaseRepository extends CrudRepository<Showcase, Long> {

    List<Showcase> findByStatus(String status);
}




