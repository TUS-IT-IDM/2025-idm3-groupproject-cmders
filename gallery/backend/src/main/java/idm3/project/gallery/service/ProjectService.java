package idm3.project.gallery.service;

import idm3.project.gallery.model.Project;
import idm3.project.gallery.model.ShowcaseProject;
import idm3.project.gallery.repository.ShowcaseProjectRepository;
import idm3.project.gallery.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private static final String UPLOAD_DIR = "uploads/images/showcases/";
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private ShowcaseProjectRepository showcaseProjectRepository;

    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    public List<ShowcaseProject> getProjects(Integer showcaseId) {
        return showcaseProjectRepository.findByShowcase_Id(showcaseId);
    }

    public Optional<Project> findOne(Integer project) {
        return projectRepository.findById(project);
    }


    public void save(Project incoming, MultipartFile file) throws IOException {
        Project project;

        // Case 1: Update existing
        if (incoming.getId() != null) {
            project = findOne(incoming.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Project not found with id: " + incoming.getId()));
        }
        // Case 2: Create new
        else {
            project = new Project();
        }

        // Set properties from an incoming object
        project.setTitle(incoming.getTitle());
        project.setDescription(incoming.getDescription());
        project.setDescSummary(incoming.getDescSummary());
        project.setCreated(incoming.getCreated());
        project.setModified(incoming.getModified());
        project.setUser(incoming.getUser());

        // Upload file
        String uploadedFileName = handleFile(file);
        if (uploadedFileName != null) {
            project.setHeroImage(uploadedFileName);
        }

        projectRepository.save(project);
    }

    public String handleFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        Files.createDirectories(Paths.get(UPLOAD_DIR));

        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);
        Files.write(filePath, file.getBytes());

        return fileName;
    }

    public void delete(Integer project) {
        projectRepository.deleteById(project);
    }

}