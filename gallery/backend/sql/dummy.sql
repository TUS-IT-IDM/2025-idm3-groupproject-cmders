USE gallery;
START TRANSACTION;

-- === USERS ===
INSERT INTO `user` (`type`, `first_name`, `last_name`, `email`, `password`, `profile_picture`) VALUES
('Admin', 'Sophie', 'Bakker', 'sophie.bakker@tus.ie', 'admin123', 'pfp_admin.jpg'),
('Student', 'Leon', 'Moelker', 'leon.moelker@student.tus.ie', 'passleon', 'leon.jpg'),
('Student', 'Isa', 'Popescu', 'isa.popescu@student.tus.ie', 'passisa', 'isa.jpg'),
('Student', 'Tom', 'Hughes', 'tom.hughes@student.tus.ie', 'passtom', 'tom.jpg'),
('Employer', 'Carla', 'Reynolds', 'carla.reynolds@greenoffice.ie', 'careers', 'carla.jpg'),
('Employer', 'Marcus', 'Klein', 'marcus.klein@studios.com', 'mkpass', 'marcus.jpg');

-- === CATEGORIES ===
INSERT INTO `theme` (`name`) VALUES
('Game Development'),
('Web Design'),
('UI/UX Design'),
('3D Modeling'),
('Animation'),
('Graphic Design'),
('Sound Design');

-- === SHOWCASES ===
INSERT INTO `showcase` (`theme`, `start`, `end`, `title`, `description`, `status`, `hero_image`) VALUES
(1, '2024-03-01 10:00:00', '2024-03-31 18:00:00', 'Green Futures Showcase', 'Student projects focused on sustainability', 'Active', 'green_showcase.jpg'),
(3, '2024-06-01 10:00:00', '2024-06-30 18:00:00', 'Design & Innovation', 'A look at student creativity across all disciplines', 'Active', 'design_innovation.jpg'),
(4, '2023-11-01 10:00:00', '2023-11-30 18:00:00', 'Future of Tech', 'Innovative projects in technology and coding', 'Inactive', 'tech_future.jpg');

-- === PROJECTS ===
INSERT INTO `project` (`title`, `description`, `desc_summary`, `created`, `modified`, `user`, `hero_image`) VALUES
('Eco Tycoon', 'A strategy game teaching players about renewable energy management.', 'Build a sustainable energy empire.', '2024-02-15 14:30:00', '2024-02-20 10:00:00', 2, 'eco_tycoon.jpg'),
('Portfolio Hub', 'A full-stack web app where students can host personal portfolios.', 'Student portfolio hosting platform.', '2024-05-01 09:00:00', '2024-05-03 12:00:00', 4, 'portfolio_hub.jpg'),
('UI Design for Accessibility', 'A UX case study focused on accessible web design.', 'Accessibility-first interface design.', '2024-04-12 11:00:00', '2024-04-13 15:00:00', 3, 'accessibility_ui.jpg'),
('Fantasy Village', 'A 3D environment modeled in Blender featuring dynamic lighting.', 'Stylized 3D village environment.',  '2023-09-22 09:00:00', '2023-09-25 10:00:00', 3, 'fantasy_village.jpg'),
('Animated Short: “The Journey”', 'A short film telling the story of a young inventor.', 'Inspirational animated short.', '2023-11-15 10:00:00', '2023-11-17 09:00:00', 4, 'journey_short.jpg'),
('Soundscape Generator', 'An interactive sound design tool for games and films.', 'Procedural ambient sound generator.', '2024-01-10 15:00:00', '2024-01-12 17:00:00', 2, 'soundscape_gen.jpg');

-- === FILES ===
INSERT INTO `file` (`type`, `file_path`, `project`) VALUES
('Image', 'eco_tycoon_1.jpg', 1),
('Image', 'eco_tycoon_2.jpg', 1),
('Video', 'eco_tycoon_trailer.mp4', 1),
('Pdf', 'portfolio_hub_doc.pdf', 2),
('Image', 'portfolio_hub_ui.jpg', 2),
('Image', 'ui_accessibility_wireframe.png', 3),
('Image', 'fantasy_village_render.jpg', 4),
('Video', 'the_journey_short.mp4', 5),
('Mp3', 'soundscape_demo.mp3', 6);

-- === SHOWCASE_PROJECT LINKS ===
INSERT INTO `showcase_project` (`showcase`, `project`) VALUES
(1, 1),
(1, 6),
(2, 2),
(2, 3),
(2, 5),
(3, 4);

COMMIT;