package idm3.project.gallery.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserProjectLikeId implements Serializable {

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "project_id")
    private Integer projectId;

    // constructors
    public UserProjectLikeId() {}

    public UserProjectLikeId(Integer userId, Integer projectId) {
        this.userId = userId;
        this.projectId = projectId;
    }

    // getters / setters
    public Integer getUserId() {
        return userId;
    }

    public Integer getProjectId() {
        return projectId;
    }

    public void setUserId(Integer id) {
        this.userId = id;
    }

    public void setProjectId(Integer id) {
        this.projectId = id;
    }

    // equals / hashCode (both fields!)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserProjectLikeId)) return false;
        UserProjectLikeId that = (UserProjectLikeId) o;
        return Objects.equals(userId, that.userId)
                && Objects.equals(projectId, that.projectId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, projectId);
    }
}