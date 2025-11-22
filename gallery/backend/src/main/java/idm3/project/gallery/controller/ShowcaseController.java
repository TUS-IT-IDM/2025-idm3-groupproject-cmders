package idm3.project.gallery.controller;

import idm3.project.gallery.model.Showcase;
import idm3.project.gallery.service.ShowcaseService;
import idm3.project.gallery.service.ThemeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public void saveShowcase(@RequestBody Showcase showcase) {
        showcaseService.saveShowcase(showcase);
    }

    @GetMapping({"/{id}"})
    public Showcase getShowcase(@PathVariable("id") Integer id) {
        return showcaseService.findOne(id).get();
    }
}