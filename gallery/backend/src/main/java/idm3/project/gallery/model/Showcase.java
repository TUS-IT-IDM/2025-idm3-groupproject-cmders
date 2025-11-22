package idm3.project.gallery.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "showcase")
public class Showcase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @NotNull(message = "A valid theme is required")
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "theme", nullable = false)
    private Theme theme;

    @NotNull(message = "Please select a start time")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Column(name = "start")
    private LocalDateTime start;

    @NotNull(message = "Please select an end time")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Column(name = "end")
    private LocalDateTime end;

    @NotBlank(message = "Please enter a title")
    @Size(max = 45, message = "The title must not exceed 45 characters")
    @Column(name = "title", length = 45)
    private String title;

    @NotBlank(message = "Please enter a description")
    @Size(max = 500, message = "The description must not exceed 500 characters")
    @Column(name = "description", length = 45)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @NotBlank(message = "Please provide a hero image")
    @Column(name = "hero_image")
    private String heroImage;

    public enum Status {
        Inactive, Active
    }
}