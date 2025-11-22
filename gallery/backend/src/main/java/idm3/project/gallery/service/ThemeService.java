package idm3.project.gallery.service;

import idm3.project.gallery.model.Theme;
import idm3.project.gallery.repository.ThemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThemeService {
    @Autowired
    private ThemeRepository themeRepository;

    public List<Theme> findAll() {
        return (List<Theme>) themeRepository.findAll();
    }
}
