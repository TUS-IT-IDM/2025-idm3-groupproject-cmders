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
    private static final String UPLOAD_DIR = "src/main/resources/static/assets/images/showcases/";
    @Autowired
    private ShowcaseRepository showcaseRepository;
    @Autowired
    private ShowcaseProjectRepository showcaseProjectRepository;

    public List<Showcase> findAll() {
        return showcaseRepository.findAll();
    }

    public List<ShowcaseProject> getShowcaseProjects(Integer showcaseId) {
        return showcaseProjectRepository.findByShowcaseId(showcaseId);
    }

    public Optional<Showcase> findOne(Integer showcase) {
        return showcaseRepository.findById(showcase);
    }

    public void save(Showcase showcase, MultipartFile file) throws IOException {
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

    public void saveShowcase(Showcase showcase) {
        showcaseRepository.save(showcase);
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