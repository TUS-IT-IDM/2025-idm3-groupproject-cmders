-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 09, 2025 at 01:13 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studentGallery`
--
CREATE DATABASE IF NOT EXISTS `gallery` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `gallery`;

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int(11) NOT NULL,
  `type` enum('Image','Video','Pdf','Mp3') DEFAULT NULL,
  `file_path` varchar(255) DEFAULT NULL,
  `project` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `file`
--

INSERT INTO `file` (`id`, `type`, `file_path`, `project`) VALUES
(1, 'Image', 'eco_tycoon_1.jpg', 1),
(2, 'Image', 'eco_tycoon_2.jpg', 1),
(3, 'Video', 'eco_tycoon_trailer.mp4', 1),
(4, 'Pdf', 'portfolio_hub_doc.pdf', 2),
(5, 'Image', 'portfolio_hub_ui.jpg', 2),
(6, 'Image', 'ui_accessibility_wireframe.png', 3),
(7, 'Image', 'fantasy_village_render.jpg', 4),
(8, 'Video', 'the_journey_short.mp4', 5),
(9, 'Mp3', 'soundscape_demo.mp3', 6),
(10, 'Pdf', 'Motivation Letter.pdf', NULL),
(11, 'Pdf', 'CoverLetter.pdf', NULL),
(18, 'Image', 'ResumePicture.png', NULL),
(19, 'Pdf', 'DierenambulanceWireframes.pdf', NULL),
(20, 'Image', 'portfolio-cover.jpg', 42),
(21, 'Image', 'colour.jpg', 42);

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(3000) DEFAULT NULL,
  `desc_summary` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `user` int(11) NOT NULL,
  `hero_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `title`, `description`, `desc_summary`, `created`, `modified`, `user`, `hero_image`) VALUES
(1, 'Eco Tycoon', 'Developing this eco-tycoon game has been one of the most demanding and rewarding projects I’ve worked on as a student. When I first started, I only had a rough idea of what I wanted: a simulation where players manage a city with a strong focus on sustainability. \n\nI didn’t realize how many interconnected systems I would need to design. Energy, waste, water use, citizen satisfaction, random events, pollution levels, each mechanic depended on another, which meant every new feature had the potential to break three others.\n\nThe energy system was the first major challenge. I wanted solar, wind, geothermal, and fossil options, each with different costs, outputs, and consequences. Getting them to balance properly took weeks. At one point, wind power was so strong that players could cover the map with turbines and never worry about anything again. At another point, solar plants barely produced enough to power a single small building. Tuning those numbers became a daily routine.\n\nThe population system came next. I wanted the citizens to feel like more than statistics, so I created different groups with different priorities: eco-conscious residents, industrial workers, families, students. Each group responds differently to pollution, taxes, jobs, and available green spaces. This led to some interesting moments in testing, like when the entire city became unhappy because I accidentally coded an event that reduced air quality by 200% instead of 20%.\n\nEvents were another layer that complicated everything. Heatwaves, droughts, environmental grants, protests, technology breakthroughs, each event needed meaningful effects without completely ruining the player’s progress. Balancing difficulty was tricky. Too many disasters made the game frustrating; too many rewards made it boring.\n\nDespite all the issues, bugs, and late-night debugging sessions, the project became something I’m genuinely proud of. Watching the systems interact for the first time, seeing energy production rise, pollution fall, and citizens respond, felt like all the effort finally came together. The game isn’t perfect, but it reflects real sustainability challenges.', 'Build a sustainable energy empire.', '2024-02-15 14:30:00', '2024-02-20 10:00:00', 3, 'eco-thumbnail.jpg'),
(2, 'Portfolio Hub', 'Building a student portfolio platform turned out to be one of the most practical projects I’ve worked on because I was essentially designing a tool I wished I had when I started school. My goal was simple: create a clean, intuitive place where students could showcase their projects, track their progress, and share their work with teachers or potential employers. Actually making that happen took a lot more planning than I expected.\n\nThe first big challenge was organizing the structure. I needed a dashboard, project pages, file uploads, profile customization, and a simple way for students to write descriptions without getting lost in complicated menus. I spent a long time sketching wireframes and testing layouts. Every time I thought I had the perfect design, I’d find a small detail—like a cluttered sidebar or a confusing button—that completely threw off the user experience.\n\nOnce the design felt solid, I moved to the backend. Creating user accounts, secure logins, and a database that stored projects and images taught me more about authentication and data management than any class had. I also had to learn how to prevent the most common mistakes, like the platform accidentally accepting file types it shouldn’t or storing huge images that slowed everything down.\n\nThe part I enjoyed the most was polishing the project pages. I wanted each student’s work to feel like it was on display in a digital gallery. I added project tags, progress indicators, preview thumbnails, and even a “spotlight” mode that highlights the student’s favorite creation. Small visual touches, like subtle animations and soft color palettes, made the platform feel more welcoming.\n\nTesting the platform with real students was both helpful and humbling. Some features I thought were essential went completely unnoticed, while simple things—like being able to reorder projects—turned out to be very important. Their feedback helped me refine the platform into something cleaner, faster, and more intuitive.\n\nBy the end of the project, the platform had grown into a tool that felt genuinely useful. Building it taught me a lot about UX, design consistency, backend structure, and staying focused on what users actually need. Seeing classmates upload their work and proudly show off their pages made all the effort worth it.', 'Student portfolio hosting platform.', '2024-05-01 09:00:00', '2024-05-03 13:30:00', 3, 'portfolio-cover.jpg'),
(3, 'UI Design for Accessibility', 'Working on an accessibility-focused UI was one of the most eye-opening projects I’ve done as a student. At first, I thought accessibility just meant adding bigger text or high-contrast colors, but I quickly realized it goes far deeper. My goal became creating an interface that anyone could use comfortably—no matter their abilities, devices, or conditions. Achieving that meant rethinking a lot of assumptions I’d made about design.\n\nI started by researching common accessibility guidelines, like WCAG standards, and studying examples of inclusive interfaces. It was surprising how many small things can affect usability: low-contrast buttons, icons without labels, unclear focus states, touch targets that are too small, or animations that might trigger motion sensitivity. I began seeing these issues everywhere, even in apps I used daily.\n\nThe design process changed completely once I adopted an accessibility-first mindset. I created scalable typography, added robust keyboard navigation, and ensured every interactive element had a clear visual and screen-reader-friendly purpose. I learned how important things like hierarchy, spacing, consistent patterns, and predictable behavior are for users who rely on assistive technologies.\n\nColor was another big challenge. I wanted the UI to look modern and appealing, but color contrast requirements sometimes clashed with aesthetic ideas. Finding a balance taught me a lot about designing with intention—every shade and highlight needed a reason. I also introduced alternate themes, including high-contrast and dyslexia-friendly modes, so users could switch to what worked best for them.\n\nTesting was the most valuable part. I asked classmates with different needs to try the interface, and their feedback was incredibly insightful. Some struggled with navigation flow, others with button placement or text readability. Every round of testing revealed issues I didn’t even think to check for, which made the project feel like constant discovery and improvement.\n\nBy the end, I had a UI that felt genuinely inclusive—not perfect, but thoughtfully built. The project changed how I approach design in general. Instead of adding accessibility at the end as an extra feature, I now see it as the foundation of good design. Making a product more accessible doesn’t limit creativity; it pushes you to create experiences that work for everyone. And as a student, realizing that my work could actually make technology more welcoming was incredibly rewarding.', 'Accessibility-first interface design.', '2024-04-12 11:00:00', '2024-04-13 15:00:00', 3, 'acessibility.jpg'),
(4, 'Fantasy Village', 'Creating a 3D fantasy village environment became one of the most immersive projects I’ve worked on during my studies. I started with a simple idea: a small, cozy settlement tucked into a valley, surrounded by forests, mountains, and hints of ancient magic. What I didn’t expect was how much detail goes into making a world feel alive. Every rock, every house, every lantern needed to serve a purpose and contribute to the atmosphere.\n\nThe first challenge was blocking out the terrain. I sculpted hills, carved pathways, and placed a river that wound through the village. Getting the scale right took several attempts—my first version looked more like a theme park than a real settlement. Once the land felt believable, I began designing the buildings. I wanted them to look handmade, as if villagers built them with local wood and stone. I exaggerated shapes and added curved roofs, uneven beams, and warm, glowing windows to capture that storybook fantasy feeling.\n\nLighting was a huge learning curve. In a fantasy setting, light isn’t just functional—it sets the mood. I spent hours experimenting with day–night cycles, trying to achieve the perfect sunset that made the village look calm and magical instead of gloomy. Nighttime was even trickier. Lamps, fire pits, and glowing runes needed just the right intensity to guide the player without overwhelming the scene.\n\nAdding small environmental details helped the world feel real. I scattered crates, barrels, hanging cloth, stacks of firewood, flower beds, and market stalls. Then I layered in particle effects: drifting leaves, gentle fog, insects around lanterns, and smoke rising from chimneys. These tiny touches made the environment feel lived-in rather than just visually pretty.\n\nThe last major step was optimizing the scene. My early versions ran terribly because I had way too many high-poly models and unbaked lights. Learning to use LODs, light baking, and efficient texture atlases was a challenge, but it made a huge difference. By the end of the project, I had an environment that was not only beautiful but also ran smoothly.\n\nLooking back, building this 3D fantasy village taught me more than I expected—about worldbuilding, technical workflows, and how small artistic choices affect the player’s emotional experience. Seeing the final scene rendered, with the wind blowing through trees and lanterns flickering along the paths, genuinely felt like stepping into a little world I had created from scratch.', 'Stylized 3D village environment.', '2023-09-22 09:00:00', '2023-09-25 10:00:00', 3, 'Fantasy-Tower.jpg'),
(5, 'Animated Short: “The Journey”', 'Creating my animated short, The Journey, was one of the most challenging and rewarding experiences I’ve had as a student. The idea started as a simple sketch: a character traveling through ever-changing landscapes, facing obstacles and discovering moments of wonder. But bringing that vision to life meant tackling storytelling, animation, sound, and pacing all at once, and each layer added a new set of challenges.\n\nI began with storyboarding. Every shot had to communicate emotion and narrative without relying on dialogue, so I focused on visual storytelling. Expressions, body language, and environment details became my language. I experimented with framing and perspective to make the journey feel immersive—sometimes intimate, sometimes vast and overwhelming. I quickly realized that timing was everything: a pause, a slow pan, or a subtle gesture could completely change how the audience experienced a scene.\n\nThe animation process itself was intense. I wanted the movements to feel natural but expressive, giving the character a sense of personality and resilience. I experimented with keyframes, easing, and squash-and-stretch techniques to make motion fluid. Some sequences took weeks to perfect, especially transitions between environments, because I needed the world to feel alive and consistent while still supporting the story.\n\nDesigning the world was another creative challenge. Each landscape had to reflect the emotional tone of that part of the journey. I played with color palettes, lighting, and texture to evoke feelings of hope, uncertainty, and triumph. From misty forests to glowing mountains, the environments became characters in their own right, shaping the protagonist’s experience and reinforcing the narrative arc.\n\nSound design and music were equally critical. I used subtle ambient sounds and thematic motifs to heighten emotion and guide the viewer’s attention. Moments of silence were just as important as musical cues, allowing tension or reflection to breathe. Pairing visuals with audio created an emotional rhythm that helped the story resonate more deeply.\n\nLooking back, The Journey taught me how layered and collaborative animation really is—even as a solo project. It required patience, iteration, and constant problem-solving, but seeing the final short play from start to finish was incredibly rewarding. Beyond technical skills, it showed me the power of storytelling and emotion in animation: how a simple journey can feel universal and meaningful. It wasn’t just a project; it was an experience that shaped the way I approach creativity and narrative as a student.\n\n', 'Inspirational animated short.', '2023-11-15 10:00:00', '2023-11-17 09:00:00', 3, 'cover-film.jpg'),
(6, 'Emotion Design', 'Working on sound design based on how emotions feel was one of the most creative and introspective projects I’ve taken on. Instead of thinking about sound as an effect or background detail, I had to think of it as a direct translation of human emotion. My goal was to make players feel something the moment a sound played—even before they understood why.\n\nI started by mapping out a list of core emotions: joy, fear, tension, curiosity, calm, nostalgia, and frustration. Then I broke each emotion down into qualities—sharp or soft, fast or slow, warm or cold, bright or muted. This helped me figure out the textures and tones I needed. For example, “calm” felt round and low, almost like a gentle hum, while “tension” felt tight and metallic, full of dissonance and irregular rhythm.\n\nExperimentation became the heart of the project. I layered soft bells, airy synths, and slow fading reverbs to express gentle emotions, while harsher ones required distorted samples, tight staccato patterns, or sudden drops in volume. It surprised me how a tiny shift—like increasing reverb by half a second or slightly detuning a note—could completely change the emotional response.\n\nOne of the biggest challenges was avoiding clichés. Fear doesn’t always need a deep rumble, and happiness isn’t just major chords. I pushed myself to explore unconventional sources: recordings of everyday objects, environmental sounds, even my own voice. Some of the best results came from manipulating these raw materials until they no longer sounded like their origin but still carried an emotional footprint.\n\nTesting the sounds with classmates taught me a lot about perception. People didn’t always react the way I expected. A sound I designed to be “hopeful” was described as “lonely” by several listeners, which made me rethink how subjective emotion really is. Instead of forcing one interpretation, I adjusted the designs to capture more complexity—emotions rarely exist in simple, isolated forms.\n\nAs the project grew, I started pairing sounds with short scenes or UI interactions to see how they functioned contextually. That step made everything click. Suddenly the emotional cues supported the experience rather than standing alone. The user wasn’t just hearing a sound; they were responding to it.\n\nBy the end, the process taught me that sound design isn’t just technical—it’s deeply psychological. It requires empathy, imagination, and an understanding of how people process subtle details. Building a library of emotion-driven sounds helped me grow not only as a designer but also as a storyteller. Turning feelings into audio was challenging, but it was also one of the most meaningful creative experiences I’ve had as a student.\n', 'Sound design based on how emotions feel.', '2024-01-10 15:00:00', '2024-01-12 17:00:00', 3, 'sound.jpg'),
(42, 'Print Platform', 'Developing a print platform was one of the most practical and enlightening projects I’ve done as a student. The idea was to create a digital tool that allowed users to design, customize, and prepare content for physical printing—from flyers and posters to booklets and business cards. At first, it seemed straightforward, but I quickly realized that balancing creative freedom with technical constraints would be the biggest challenge.\n\nThe project began with researching existing print workflows and standards. I learned about color profiles, DPI requirements, bleed areas, and safe margins—details that are easy to overlook but critical for print quality. Translating these technical requirements into a user-friendly interface became my first major hurdle. I wanted the platform to feel intuitive for beginners, while still offering advanced controls for experienced users.\n\nDesigning the interface required careful thought. I created modular layouts, drag-and-drop elements, customizable templates, and real-time previews so users could see exactly how their work would appear in print. It was important to make interactions predictable: snapping guides, alignment helpers, and undo/redo functions helped users feel in control without overwhelming them with options.\n\nHandling file management and export functionality was another challenge. Users needed to upload images, add text, and generate high-resolution print-ready files without errors. I spent a lot of time optimizing export pipelines and ensuring that color consistency, transparency, and resolution were preserved. Debugging edge cases, like very large images or unusual page sizes, taught me the importance of anticipating user needs.\n\nTesting with classmates revealed how critical accessibility and clarity were. Some users struggled to understand color warnings, alignment guides, or template switching. Iterating based on feedback led to improvements like clearer tooltips, adaptive layout hints, and a step-by-step tutorial mode. Watching users complete their projects successfully gave me a strong sense of accomplishment.\n\nBy the end, the platform felt polished, responsive, and genuinely helpful. Developing it taught me more than just technical skills—it deepened my understanding of user experience, workflow design, and how to translate complex, real-world processes into a digital tool. Seeing students confidently design print-ready materials reminded me why I started the project: to make a complex task simple, creative, and empowering.', 'Printing guide for beginners.', '2025-12-26 18:52:00', '2025-12-27 18:53:00', 3, 'colour.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `showcase`
--

DROP TABLE IF EXISTS `showcase`;
CREATE TABLE `showcase` (
  `id` int(11) NOT NULL,
  `theme` int(11) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `title` varchar(45) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `status` enum('Inactive','Active') DEFAULT NULL,
  `hero_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `showcase`
--

INSERT INTO `showcase` (`id`, `theme`, `start`, `end`, `title`, `description`, `status`, `hero_image`) VALUES
(1, 1, '2024-03-01 10:00:00', '2024-03-31 18:00:00', 'Green Futures Showcases', 'Student projects focused on sustainability', NULL, 'Screenshot 2025-10-14 134959.png'),
(2, 2, '2024-06-01 10:00:00', '2024-06-30 18:00:00', 'Design & Innovation', 'A look at student creativity across all disciplines', 'Active', 'gradient-ui-ux-elements-background_23-2149056159.jpg'),
(3, 3, '2023-11-01 10:00:00', '2023-11-30 18:00:00', 'Future of Tech', 'Innovative projects in technology and coding', 'Inactive', 'fc479e9fa1ae48c59679d660f976bfca.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `showcase_project`
--

DROP TABLE IF EXISTS `showcase_project`;
CREATE TABLE `showcase_project` (
  `showcase` int(11) NOT NULL,
  `project` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `showcase_project`
--

INSERT INTO `showcase_project` (`showcase`, `project`) VALUES
(1, 1),
(1, 6),
(2, 2),
(2, 3),
(2, 5),
(3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `theme`
--

DROP TABLE IF EXISTS `theme`;
CREATE TABLE `theme` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `theme`
--

INSERT INTO `theme` (`id`, `name`) VALUES
(1, 'Game Development'),
(2, 'Web Design'),
(3, 'UI/UX Design'),
(4, '3D Modeling'),
(5, 'Animation'),
(6, 'Graphic Design'),
(7, 'Sound Design');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `type` enum('Admin','Employer','Student') DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `type`, `first_name`, `last_name`, `email`, `password`, `profile_picture`) VALUES
(1, 'Admin', 'Sophie', 'Bakker', 'sophie.bakker@tus.ie', 'admin123', 'pfp_admin.jpg'),
(2, 'Student', 'Leon', 'Moelker', 'leon.moelker@student.tus.ie', 'passleon', 'leon.jpg'),
(3, 'Student', 'Isa', 'Popescu', 'isa.popescu@student.tus.ie', 'passisa', 'isa.jpg'),
(4, 'Student', 'Tom', 'Hughes', 'tom.hughes@student.tus.ie', 'passtom', 'tom.jpg'),
(5, 'Employer', 'Carla', 'Reynolds', 'carla.reynolds@greenoffice.ie', 'careers', 'carla.jpg'),
(6, 'Employer', 'Marcus', 'Klein', 'marcus.klein@studios.com', 'mkpass', 'marcus.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `file_path_UNIQUE` (`file_path`),
  ADD KEY `fk_File_Project1_idx` (`project`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Project_User1_idx` (`user`);

--
-- Indexes for table `showcase`
--
ALTER TABLE `showcase`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Project_category1_idx` (`theme`);

--
-- Indexes for table `showcase_project`
--
ALTER TABLE `showcase_project`
  ADD PRIMARY KEY (`showcase`,`project`),
  ADD KEY `fk_Showcase_has_Project_Project1_idx` (`project`),
  ADD KEY `fk_Showcase_has_Project_Showcase1_idx` (`showcase`);

--
-- Indexes for table `theme`
--
ALTER TABLE `theme`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `file`
--
ALTER TABLE `file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `showcase`
--
ALTER TABLE `showcase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `theme`
--
ALTER TABLE `theme`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `file`
--
ALTER TABLE `file`
  ADD CONSTRAINT `fk_File_Project1` FOREIGN KEY (`project`) REFERENCES `project` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `fk_Project_User1` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `showcase`
--
ALTER TABLE `showcase`
  ADD CONSTRAINT `fk_Project_category1` FOREIGN KEY (`theme`) REFERENCES `theme` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `showcase_project`
--
ALTER TABLE `showcase_project`
  ADD CONSTRAINT `fk_Showcase_has_Project_Project1` FOREIGN KEY (`project`) REFERENCES `project` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Showcase_has_Project_Showcase1` FOREIGN KEY (`showcase`) REFERENCES `showcase` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
