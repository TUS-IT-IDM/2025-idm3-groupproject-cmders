package idm3.project.gallery.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_project_like")
public class UserProjectLike {

    @EmbeddedId
    private UserProjectLikeId id = new UserProjectLikeId();

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("projectId")
    @JoinColumn(name = "project_id")
    private Project project;

    // constructors
    public UserProjectLike() {}

    public UserProjectLike(User user, Project project) {
        this.user = user;
        this.project = project;
        this.id = new UserProjectLikeId(user.getId(), project.getId());
    }

    // getters / setters
    public UserProjectLikeId getId() {
        return id;
    }

    public void setId(UserProjectLikeId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}