package idm3.project.gallery.service;

import idm3.project.gallery.model.File;
import idm3.project.gallery.model.Project;
import idm3.project.gallery.model.ShowcaseProject;
import idm3.project.gallery.repository.FileRepository;
import idm3.project.gallery.repository.ShowcaseProjectRepository;
import idm3.project.gallery.repository.ProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private static final String UPLOAD_DIR = "uploads/images/projects/";
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private FileRepository fileRepository;
    @Autowired
    private ShowcaseProjectRepository showcaseProjectRepository;

    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    public List<File> getFiles(Integer id) {
        return fileRepository.findByProject_Id(id);
    }

    public Optional<Project> findOne(Integer project) {
        return projectRepository.findById(project);
    }

    @Transactional
    public void save(Project incoming, MultipartFile image, List<MultipartFile> attachments) throws IOException {
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

        // Upload image
        String uploadedImageName = handleFile(image);
        if (uploadedImageName != null) {
            project.setHeroImage(uploadedImageName);
        }

        Project savedProject =  projectRepository.save(project);

        if (attachments != null && !attachments.isEmpty()) {
            for (MultipartFile attachment : attachments) {
                String name = handleFile(attachment);
                if (name != null) {
                    File file = new File();
                    file.setFilePath(name);
                    file.setProject(savedProject);
                    file.setType(determineMediaType(attachment));
                    fileRepository.save(file);
                }
            }
        }
    }

    private File.MediaType determineMediaType(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType != null) {
            if (contentType.startsWith("image/")) {
                return File.MediaType.Image;
            } else if (contentType.startsWith("video/")) {
                return File.MediaType.Video;
            } else if (contentType.startsWith("audio/")) {
                return File.MediaType.Mp3;
            } else if (contentType.equals("application/pdf")) {
                return File.MediaType.Pdf;
            }
        }
        return File.MediaType.Image; // Default fallback
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