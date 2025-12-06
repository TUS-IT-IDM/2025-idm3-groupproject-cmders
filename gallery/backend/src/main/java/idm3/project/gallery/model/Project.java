package idm3.project.gallery.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDateTime;

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

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Column(name = "created")
    private LocalDateTime created;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Column(name = "modified")
    private LocalDateTime modified;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user", nullable = false)
    private User user;

    @Column(name = "hero_image")
    private String heroImage;

}