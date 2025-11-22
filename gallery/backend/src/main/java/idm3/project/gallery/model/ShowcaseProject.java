package idm3.project.gallery.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "showcase_project")
public class ShowcaseProject {
    @EmbeddedId
    private ShowcaseProjectId id;

    @MapsId("showcase")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "showcase", nullable = false)
    private Showcase showcase;

    @MapsId("project")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "project", nullable = false)
    private Project project;

}