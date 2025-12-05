package idm3.project.gallery.controller;

import idm3.project.gallery.model.Showcase;
import idm3.project.gallery.model.ShowcaseProject;
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

    @GetMapping({"/{id}"})
    public Showcase get(@PathVariable("id") Integer id) {
        return showcaseService.findOne(id).get();
    }

    @GetMapping
    public List<Showcase> getAll() {
        return showcaseService.findAll();
    }

    @GetMapping("/{id}/projects")
    public List<ShowcaseProject> getProjects(@PathVariable("id") Integer id) {
        return showcaseService.getProjects(id);
    }

    @PostMapping
    public void save(@RequestPart("showcase") Showcase showcase, @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        showcaseService.save(showcase, file);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) {
        showcaseService.delete(id);
    }
}