-- MySQL Script for gallery schema aligned with JPA entities

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `gallery` DEFAULT CHARACTER SET utf8;
USE `gallery`;

-- Drop in dependency order to avoid FK issues (safe if not present)
DROP TABLE IF EXISTS `showcase_project`;
DROP TABLE IF EXISTS `file`;
DROP TABLE IF EXISTS `project`;
DROP TABLE IF EXISTS `category`;
DROP TABLE IF EXISTS `showcase`;
DROP TABLE IF EXISTS `user`;

-- === user ===
CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` ENUM('Admin','Employer','Student') NULL,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  `profile_picture` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email`)
) ENGINE=InnoDB;

-- === category ===
-- Note: column is named `int` in DB, mapped in JPA with @Column(name = "`int`")
CREATE TABLE `theme` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

-- === showcase ===
CREATE TABLE `showcase` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `theme` INT NULL,
  `start` DATETIME NULL,
  `end` DATETIME NULL,
  `title` VARCHAR(45) NULL,
  `description` VARCHAR(500) NULL,
  `status` ENUM('Inactive','Active') NULL,
  `hero_image` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Project_category1_idx` (`theme`),
  CONSTRAINT `fk_Project_category1`
      FOREIGN KEY (`theme`) REFERENCES `theme` (`id`)
          ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- === project ===
CREATE TABLE `project` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `description` VARCHAR(500) NULL,
  `desc_summary` VARCHAR(255) NULL,
  `created` DATETIME NULL,
  `modified` DATETIME NULL,
  `user` INT NOT NULL,
  `hero_image` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Project_User1_idx` (`user`),
  CONSTRAINT `fk_Project_User1`
    FOREIGN KEY (`user`) REFERENCES `user` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- === file ===
CREATE TABLE `file` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` ENUM('Image','Video','Pdf','Mp3') NULL,
  `file_path` VARCHAR(255) NULL,
  `project` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `file_path_UNIQUE` (`file_path`),
  INDEX `fk_File_Project1_idx` (`project`),
  CONSTRAINT `fk_File_Project1`
    FOREIGN KEY (`project`) REFERENCES `project` (`id`)
    ON DELETE SET NULL ON UPDATE NO ACTION
) ENGINE=InnoDB;

-- === showcase_project (junction) ===
CREATE TABLE `showcase_project` (
  `showcase` INT NOT NULL,
  `project` INT NOT NULL,
  PRIMARY KEY (`showcase`, `project`),
  INDEX `fk_Showcase_has_Project_Project1_idx` (`project`),
  INDEX `fk_Showcase_has_Project_Showcase1_idx` (`showcase`),
  CONSTRAINT `fk_Showcase_has_Project_Showcase1`
    FOREIGN KEY (`showcase`) REFERENCES `showcase` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Showcase_has_Project_Project1`
    FOREIGN KEY (`project`) REFERENCES `project` (`id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
