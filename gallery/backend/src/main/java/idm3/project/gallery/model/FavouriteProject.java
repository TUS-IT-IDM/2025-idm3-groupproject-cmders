package idm3.project.gallery.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "favourite_project")
public class FavouriteProject {
    @EmbeddedId
    private FavouriteProjectId id;

    @MapsId("user")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user", nullable = false)
    private User user;

    @MapsId("project")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "project", nullable = false)
    private Project project;

}