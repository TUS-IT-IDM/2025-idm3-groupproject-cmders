package idm3.project.gallery.controller;

import idm3.project.gallery.model.Project;
import idm3.project.gallery.model.Showcase;
import idm3.project.gallery.model.User;
import idm3.project.gallery.service.*;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.ui.Model;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/*@Controller()*/
@RestController
@RequestMapping(value = {"/MainGallery"})
@CrossOrigin(origins = "http://localhost:5173")
public class MainGalleryController {

    @Autowired
    private UserService userService;
    @Autowired
    private ShowcaseService showcaseService;
    @Autowired
    private ThemeService themeService;
    @Autowired
    private ProjectService projectService;
    @Autowired
    private ThumbnailService thumbnailService;
    @Autowired
    private ServletContext servletContext;

    // >>> NEW: inject LikeService <<<
    @Autowired
    private LikeService likeService;

    // Display Login Page
    @GetMapping("/Login")
    public ModelAndView showLoginPage() {
        ModelAndView modelAndView = new ModelAndView("login");
        modelAndView.addObject("user", new User());
        return modelAndView;
    }

    // Handle Login Submission
    @PostMapping("/Login")
    public ModelAndView handleLogin(@ModelAttribute("user") User user, HttpSession session) {
        ModelAndView modelAndView = new ModelAndView();
        User authenticatedUser = userService.authenticate(user.getEmail(), user.getPassword());
        if (authenticatedUser != null) {
            session.setAttribute("loggedInUser", authenticatedUser);

            String view = switch (authenticatedUser.getType()) {
                case Admin    -> "redirect:/MainGallery/adminDashboard";
                case Employer -> "redirect:/MainGallery/employerDashboard";
                case Student  -> "redirect:/MainGallery/studentDashboard";
                default       -> {
                    modelAndView.addObject("error", "Invalid user type");
                    yield "login";
                }
            };
            modelAndView.setViewName(view);
        } else {
            modelAndView.setViewName("login");
            modelAndView.addObject("error", "Invalid username or password");
        }
        return modelAndView;
    }

    // Display Registration Page
    @GetMapping("/Register")
    public ModelAndView showRegisterPage() {
        ModelAndView modelAndView = new ModelAndView("register");
        modelAndView.addObject("user", new User());
        return modelAndView;
    }

    // Handle Registration Submission
    @PostMapping("/Register")
    public ModelAndView handleRegister(@ModelAttribute("user") User user) {
        ModelAndView modelAndView = new ModelAndView();
        user.setType(User.Type.Student);
        if (userService.registerUser(user)) {
            modelAndView.setViewName("redirect:/MainGallery/Login");
            modelAndView.addObject("message", "Registration successful! Please log in.");
        } else {
            modelAndView.setViewName("register");
            modelAndView.addObject("error", "Registration failed. Username or email might already exist.");
        }
        return modelAndView;
    }

    // Display Home Page
    @RequestMapping(value = {"/HomePage", ""})
    public ModelAndView ModelAndViewsetUpIndexPageData(HttpSession session) {
        System.out.println("ModelAndViewsetUpIndexPageData");
        ModelAndView mav = new ModelAndView("homePage");

        // find all projects
        List<Project> allProjects = projectService.findAll();
        generateThumbnailProject(allProjects);
        List<Showcase> allShowcases = generateThumbnailShowcases();

        mav.addObject("AllProjectsRecentFirst", allProjects);
        mav.addObject("AllLiveShowcases", allShowcases);

        // >>> STEP 5: add like data for the view <<<
        // Map projectId -> like count
        Map<Integer, Long> projectLikeCounts = allProjects.stream()
                .collect(Collectors.toMap(
                        Project::getId,
                        p -> likeService.getLikeCount(p.getId())
                ));

        // Map projectId -> has current employer liked?
        Map<Integer, Boolean> employerLiked = new HashMap<>();
        User loggedIn = (User) session.getAttribute("loggedInUser");
        if (loggedIn != null && loggedIn.getType() == User.Type.Employer) {
            for (Project p : allProjects) {
                boolean liked = likeService.hasEmployerLikedProject(loggedIn.getId(), p.getId());
                employerLiked.put(p.getId(), liked);
            }
        }

        mav.addObject("projectLikeCounts", projectLikeCounts);
        mav.addObject("employerLiked", employerLiked);
        // <<< END STEP 5 >>>

        return mav;
    }

    @GetMapping("/studentDashboard")
    public ModelAndView studentDashboard(HttpSession session) {
        var modelAndView = new ModelAndView("studentDashboard");

        User loggedInUser = (User) session.getAttribute("loggedInUser");

        if (loggedInUser == null) {
            modelAndView.setViewName("redirect:/login");
        } else {
            modelAndView.addObject("user", loggedInUser);
            modelAndView.addObject("showcases", showcaseService.findAll());
        }

        return modelAndView;
    }

    @GetMapping("/profile")
    public ModelAndView viewProfile(HttpSession session) {
        var modelAndView = new ModelAndView("profile");

        User loggedInUser = (User) session.getAttribute("loggedInUser");

        if (loggedInUser == null) {
            modelAndView.setViewName("redirect:/login");
        } else {
            modelAndView.addObject("user", loggedInUser);
        }

        return modelAndView;
    }

    private List<Showcase> generateThumbnailShowcases() {
        List<Showcase> allShowcases = showcaseService.findAll();
        try {
            String imageDirPathShowcase = "src/main/resources/static/assets/images/showcases/";
            String thumbnailDirPathShowcase = "src/main/resources/static/assets/images/showcases/thumbnail/";
            for (Showcase showcase : allShowcases) {

                System.out.println(imageDirPathShowcase + showcase.getHeroImage());
                File image = new File(imageDirPathShowcase + "/" + showcase.getHeroImage());
                System.out.println("thumbnail:" + thumbnailDirPathShowcase + "thumb_" + image.getName());
                File thumbnailFile = new File(thumbnailDirPathShowcase + "/" + "thumb_" + image.getName());
                thumbnailService.generateThumbnailShowcase(image, thumbnailFile);
                System.out.println("Image uploaded and thumbnail created: " + thumbnailFile.getAbsolutePath());
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Failed to upload image or create thumbnail.");
        }
        return allShowcases;
    }

    private void generateThumbnailProject(List<Project> allProjects) {
        // Generate thumbnail
        try {
            String imageDirPathProject = "src/main/resources/static/assets/images/projects/";
            String thumbnailDirPathProject = "src/main/resources/static/assets/images/projects/thumbnail/";

            for (Project project : allProjects) {

                System.out.println(imageDirPathProject + project.getHeroImage());
                File image = new File(imageDirPathProject + "/" + project.getHeroImage());
                System.out.println("thumbnail:" + thumbnailDirPathProject + "thumb_" + image.getName());
                File thumbnailFile = new File(thumbnailDirPathProject + "/" + "thumb_" + image.getName());
                thumbnailService.generateThumbnail(image, thumbnailFile);
                System.out.println("Image uploaded and thumbnail created: " + thumbnailFile.getAbsolutePath());
            }
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Failed to upload image or create thumbnail.");
        }
    }

    // --- CRUD ---
    // Display All Showcases
    @RequestMapping(value = {"/allShowcases", ""})
    public ModelAndView displayAllShowcases() {
        List<Showcase> allShowcases = generateThumbnailShowcases();
        ModelAndView modelAndView = new ModelAndView("/allShowcases");
        modelAndView.addObject("showcases", allShowcases);

        return modelAndView;
    }

    // Create Showcase
    @GetMapping("/newShowcase")
    public ModelAndView displayAddShowcase() {
        ModelAndView modelAndView = new ModelAndView("/addShowcase");
        modelAndView.addObject("newShowcase", new Showcase());
        modelAndView.addObject("themes", themeService.findAll());
        return modelAndView;
    }

    @PostMapping("/submitNewShowcase")
    public ModelAndView createShowcase(@ModelAttribute("newShowcase") @Valid Showcase showcase, BindingResult result, @RequestParam("hero_image") MultipartFile file) {
        if (file == null || file.isEmpty()) {
            result.rejectValue("hero_image", "file.empty", "Hero image is required");
        }

        if (result.hasErrors()) {
            ModelAndView modelAndView = new ModelAndView("/addShowcase");
            modelAndView.addObject("newShowcase", showcase);
            modelAndView.addObject("themes", themeService.findAll());
            return modelAndView;
        }

        try {
            showcaseService.save(showcase, file);
        } catch (IOException exception) {
            exception.printStackTrace();
            return new ModelAndView("/error", "error", "Failed to upload image.");
        }
        return new ModelAndView("redirect:/MainGallery/allShowcases");
    }

    // Update Showcase
    @GetMapping("/editShowcase/{id}")
    public ModelAndView updateShowcase(@PathVariable("id") Integer id) {
        if (showcaseService.findOne(id).isEmpty()) {
            return new ModelAndView("/error", "error", "Showcase not found.");
        } else {
            ModelAndView modelAndView = new ModelAndView("/editShowcase");
            modelAndView.addObject("showcase", showcaseService.findOne(id).get());
            modelAndView.addObject("themes", themeService.findAll());
            return modelAndView;
        }
    }

    @PostMapping("/saveShowcase")
    public ModelAndView saveShowcase(@ModelAttribute("showcase") Showcase showcase, @RequestParam("hero_image") MultipartFile file, BindingResult result) {
        if (result.hasErrors()) {
            String viewName = (showcase.getId() == null) ? "/newShowcase" : "/editShowcase";
            return new ModelAndView(viewName);
        }

        if (showcase.getId() == null) {
            try {
                showcaseService.save(showcase, file);
            } catch (IOException exception) {
                exception.printStackTrace();
                return new ModelAndView("/error", "error", "Failed to upload image.");
            }
        } else {
            try {
                showcaseService.update(showcase, file);
            } catch (IOException exception) {
                exception.printStackTrace();
                return new ModelAndView("/error", "error", "Failed to upload image.");
            }
        }
        return new ModelAndView("redirect:/MainGallery/allShowcases");
    }

    // Delete Showcase
    @PostMapping("/deleteShowcase")
    public ModelAndView deleteShowcase(@RequestParam("id") Integer id) {
        if (showcaseService.findOne(id).isEmpty()) {
            return new ModelAndView("/error", "error", "Showcase not found.");
        } else {
            showcaseService.delete(id);
            return new ModelAndView("redirect:/MainGallery/allShowcases");
        }
    }

    @GetMapping("/searchShowcase")
    public ModelAndView searchShowcases(@RequestParam(value = "keyword", required = false) String keyword) {
        List<Showcase> searchResults = showcaseService.search(keyword);
        return new ModelAndView("/allShowcases", "showcases", searchResults);
    }

    @GetMapping("/showShowcase/{id}")
    public ModelAndView showShowcase(@PathVariable("id") Integer id) {
        if (showcaseService.findOne(id).isEmpty()) {
            return new ModelAndView("/error", "error", "Showcase not found.");
        } else {
            ModelAndView modelAndView = new ModelAndView("/showShowcase");
            modelAndView.addObject("showcase", showcaseService.findOne(id).get());
            modelAndView.addObject("themes", themeService.findAll());
            modelAndView.addObject("showcaseProjects", showcaseService.getProjects(id));
            modelAndView.addObject("projects", projectService.findAll());
            modelAndView.addObject("user", userService.findAll());
            return modelAndView;
        }
    }

    @GetMapping("/employerDashboard")
    public String employerDashboard(HttpSession session, Model model) {
        User loggedIn = (User) session.getAttribute("loggedInUser");
        if (loggedIn == null || loggedIn.getType() != User.Type.Employer) {
            return "redirect:/MainGallery/Login";
        }

        List<Project> liked = likeService.getLikedProjectsForEmployer(loggedIn.getId());

        model.addAttribute("user", loggedIn);
        model.addAttribute("likedProjects", liked);
        return "employerDashboard";
    }

    @PostMapping("/projects/{projectId}/like")
    public String likeProject(@PathVariable Integer projectId,
                              HttpSession session,
                              HttpServletRequest request) {
        User loggedIn = (User) session.getAttribute("loggedInUser");
        if (loggedIn == null)
            return "redirect:/MainGallery/Login";

        likeService.likeProject(loggedIn.getId(), projectId);

        return "redirect:" + request.getHeader("Referer");
    }

    @PostMapping("/projects/{projectId}/unlike")
    public String unlikeProject(@PathVariable Integer projectId,
                                HttpSession session,
                                HttpServletRequest request) {
        User loggedIn = (User) session.getAttribute("loggedInUser");
        if (loggedIn == null)
            return "redirect:/MainGallery/Login";

        likeService.unlikeProject(loggedIn.getId(), projectId);

        return "redirect:" + request.getHeader("Referer");
    }
}