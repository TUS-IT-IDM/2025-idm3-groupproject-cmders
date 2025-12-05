package idm3.project.gallery.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private Type type;

    @Column(name = "first_name", length = 45)
    private String firstName;

    @Column(name = "last_name", length = 45)
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "profile_picture")
    private String profilePicture;

    public enum Type {
        Admin, Employer, Student
    }

    /**
     * Projects this user has liked (join entity).
     */
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private Set<UserProjectLike> likedProjects = new HashSet<>();

    /* ---------- Helper methods for likes ---------- */

    public void likeProject(Project project) {
        if (project == null) {
            return;
        }

        if (likedProjects == null) {
            likedProjects = new HashSet<>();
        }

        boolean alreadyLiked = likedProjects.stream()
                .anyMatch(lp ->
                        lp.getProject() != null &&
                                Objects.equals(lp.getProject().getId(), project.getId())
                );

        if (!alreadyLiked) {
            UserProjectLike like = new UserProjectLike(this, project);
            likedProjects.add(like);

            // keep the other side of the relationship in sync
            if (project.getLikes() != null) {
                project.getLikes().add(like);
            }
        }
    }

    public void unlikeProject(Project project) {
        if (project == null || likedProjects == null || likedProjects.isEmpty()) {
            return;
        }

        likedProjects.removeIf(like -> {
            boolean matches = like.getProject() != null &&
                    Objects.equals(like.getProject().getId(), project.getId());

            if (matches) {
                // keep the other side in sync
                if (project.getLikes() != null) {
                    project.getLikes().remove(like);
                }
                like.setUser(null);
                like.setProject(null);
            }

            return matches;
        });
    }

    public boolean hasLiked(Project project) {
        if (project == null || likedProjects == null) {
            return false;
        }

        return likedProjects.stream()
                .anyMatch(lp ->
                        lp.getProject() != null &&
                                Objects.equals(lp.getProject().getId(), project.getId())
                );
    }
}