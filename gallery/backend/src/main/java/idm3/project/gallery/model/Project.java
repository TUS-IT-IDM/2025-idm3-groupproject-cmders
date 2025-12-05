package idm3.project.gallery.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

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

    /**
     * Users who have liked this project (join entity).
     */
    @OneToMany(
            mappedBy = "project",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private Set<UserProjectLike> likes = new HashSet<>();

    /* ---------- Helper method for like count ---------- */

    public int getLikeCount() {
        return likes == null ? 0 : likes.size();
    }
}