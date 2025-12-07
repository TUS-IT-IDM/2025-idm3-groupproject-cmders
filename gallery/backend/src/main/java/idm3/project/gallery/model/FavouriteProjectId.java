package idm3.project.gallery.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class FavouriteProjectId implements Serializable {
    private static final long serialVersionUID = 9017328229772565598L;
    @NotNull
    @Column(name = "user", nullable = false)
    private Integer user;

    @NotNull
    @Column(name = "project", nullable = false)
    private Integer project;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        FavouriteProjectId entity = (FavouriteProjectId) o;
        return Objects.equals(this.project, entity.project) &&
                Objects.equals(this.user, entity.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(project, user);
    }

}