package idm3.project.gallery.repository;

import idm3.project.gallery.model.File;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends ListCrudRepository<File, Integer> {
    List<File> findByProject_Id(Integer id);
}
