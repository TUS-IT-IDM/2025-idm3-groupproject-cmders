package idm3.project.gallery.controller;

import idm3.project.gallery.model.Showcase;
import idm3.project.gallery.service.ShowcaseService;
import idm3.project.gallery.service.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/showcases")
public class ShowcaseController {
    private final ShowcaseService showcaseService;

    @Autowired
    public ShowcaseController(ShowcaseService showcaseService, ThemeService themeService) {
        this.showcaseService = showcaseService;
    }

    @GetMapping
    public List<Showcase> getAllShowcases() {
        return showcaseService.findAll();
    }

    @PostMapping
    public void saveShowcase(@RequestPart("showcase") Showcase showcase, @RequestPart("file") MultipartFile file) throws IOException {
        showcaseService.saveShowcase(showcase, file);
    }

    @GetMapping({"/{id}"})
    public Showcase getShowcase(@PathVariable("id") Integer id) {
        return showcaseService.findOne(id).get();
    }
}