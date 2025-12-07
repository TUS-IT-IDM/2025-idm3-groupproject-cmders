package idm3.project.gallery.controller;

import idm3.project.gallery.model.FavouriteProject;
import idm3.project.gallery.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}/favourites")
    public List<FavouriteProject> getFavourites(@PathVariable("id") Integer id) {
        return userService.getFavourites(id);
    }

    @PostMapping("/{id}/favourite")
    public void favourite(@PathVariable("id") Integer userId, @RequestBody Integer projectId) {
        userService.favourite(userId, projectId);
    }

    @DeleteMapping("/{userId}/unfavourite/{projectId}")
    public void unfavourite(@PathVariable("userId") Integer userId, @PathVariable("projectId") Integer projectId) {
        userService.unfavourite(userId, projectId);
    }
}
