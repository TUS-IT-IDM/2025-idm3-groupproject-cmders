package idm3.project.gallery.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class ShowcaseProjectId implements Serializable {
    private static final long serialVersionUID = -6322726848339381691L;
    @Column(name = "showcase", nullable = false)
    private Integer showcase;

    @Column(name = "project", nullable = false)
    private Integer project;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ShowcaseProjectId entity = (ShowcaseProjectId) o;
        return Objects.equals(this.showcase, entity.showcase) &&
                Objects.equals(this.project, entity.project);
    }

    @Override
    public int hashCode() {
        return Objects.hash(showcase, project);
    }

}