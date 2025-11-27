package idm3.project.gallery.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "project")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "title", length = 45)
    private String title;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "desc_summary")
    private String descSummary;

    @Column(name = "created")
    private Instant created;

    @Column(name = "modified")
    private Instant modified;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user", nullable = false)
    private User user;

    @Column(name = "hero_image")
    private String heroImage;

}