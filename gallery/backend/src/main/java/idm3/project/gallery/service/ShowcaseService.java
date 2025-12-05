package idm3.project.gallery.service;

import idm3.project.gallery.model.Showcase;
import idm3.project.gallery.model.ShowcaseProject;
import idm3.project.gallery.repository.ShowcaseProjectRepository;
import idm3.project.gallery.repository.ShowcaseRepository;
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
public class ShowcaseService {
    private static final String UPLOAD_DIR = "uploads/images/showcases/";
    @Autowired
    private ShowcaseRepository showcaseRepository;
    @Autowired
    private ShowcaseProjectRepository showcaseProjectRepository;

    public List<Showcase> findAll() {
        return showcaseRepository.findAll();
    }

    public List<ShowcaseProject> getProjects(Integer showcaseId) {
        return showcaseProjectRepository.findByShowcase_Id(showcaseId);
    }

    public Optional<Showcase> findOne(Integer showcase) {
        return showcaseRepository.findById(showcase);
    }


    public void save(Showcase incoming, MultipartFile file) throws IOException {
        Showcase showcase;

        // Case 1: Update existing
        if (incoming.getId() != null) {
            showcase = findOne(incoming.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Showcase not found with id: " + incoming.getId()));
        }
        // Case 2: Create new
        else {
            showcase = new Showcase();
        }

        // Set properties from an incoming object
        showcase.setTheme(incoming.getTheme());
        showcase.setTitle(incoming.getTitle());
        showcase.setStart(incoming.getStart());
        showcase.setEnd(incoming.getEnd());
        showcase.setDescription(incoming.getDescription());
        showcase.setStatus(incoming.getStatus());

        // Upload file
        String uploadedFileName = handleFile(file);
        if (uploadedFileName != null) {
            showcase.setHeroImage(uploadedFileName);
        }

        showcaseRepository.save(showcase);
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

    public void saveShowcase(Showcase showcase, MultipartFile file) throws IOException {
        String fileName = "";
        if (!file.isEmpty()) {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            fileName = file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR + fileName);
            Files.write(filePath, file.getBytes());
            showcase.setHeroImage(fileName);
        }

        showcaseRepository.save(showcase);
    }

    public void update(Showcase updatedShowcase, MultipartFile file) throws IOException {
        Optional<Showcase> existingShowcase = showcaseRepository.findById(updatedShowcase.getId());
        if (existingShowcase.isPresent()) {
            Showcase showcase = existingShowcase.get();
            showcase.setTheme(updatedShowcase.getTheme());
            showcase.setTitle(updatedShowcase.getTitle());
            showcase.setStart(updatedShowcase.getStart());
            showcase.setEnd(updatedShowcase.getEnd());
            showcase.setDescription(updatedShowcase.getDescription());
            showcase.setStatus(updatedShowcase.getStatus());
            /*showcase.setHeroImage(updatedShowcase.getHeroImage());*/
            String fileName = updatedShowcase.getHeroImage();
            if (!file.isEmpty()) {
                Files.createDirectories(Paths.get(UPLOAD_DIR));
                fileName = file.getOriginalFilename();
                Path filePath = Paths.get(UPLOAD_DIR + fileName);
                Files.write(filePath, file.getBytes());
                showcase.setHeroImage(fileName);
            }
            showcaseRepository.save(showcase);
        } else {
            throw new EntityNotFoundException("Showcase not found with id: " + updatedShowcase.getId());
        }
    }

    public void delete(Integer showcase) {
        showcaseRepository.deleteById(showcase);
    }

    public List<Showcase> search(String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return findAll();
        }
        return showcaseRepository.findByTheme_NameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
    }
}