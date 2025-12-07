package idm3.project.gallery.controller;

import idm3.project.gallery.model.File;
import idm3.project.gallery.model.Project;
import idm3.project.gallery.model.ShowcaseProject;
import idm3.project.gallery.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<Project> getAll() {
        return projectService.findAll();
    }

    @GetMapping({"/{id}"})
    public Project get(@PathVariable("id") Integer id) {
        return projectService.findOne(id).get();
    }

    @GetMapping("/{id}/files")
    public List<File> getFiles(@PathVariable("id") Integer id) {
        return projectService.getFiles(id);
    }

    @PostMapping
    public void save(
            @RequestPart("project") Project project,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestPart(value = "attachments", required = false) List<MultipartFile> attachments
        ) throws IOException {
        projectService.save(project, image, attachments);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) {
        projectService.delete(id);
    }
}