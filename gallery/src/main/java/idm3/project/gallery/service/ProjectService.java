package idm3.project.gallery.service;
import idm3.project.gallery.model.Project;
import idm3.project.gallery.repository.ProjectRepository;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepo;
    // Fetch all projects ordered by creation date (newest first)
    public List<Project> findAllOrderedByCreationDate() {
        return projectRepo.findAllByOrderByCreationDateDesc();
    }
    public List<Project> findAll() {
        return (List<Project>) projectRepo.findAll();
    }
}
