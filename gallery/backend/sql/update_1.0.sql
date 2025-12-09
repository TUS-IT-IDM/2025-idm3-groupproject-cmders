CREATE TABLE `favourite_project` (
    `user` INT NOT NULL,
    `project` INT NOT NULL,
    PRIMARY KEY (`user`, `project`),
    INDEX `fk_User_has_Project_Project1_idx` (`project`),
    INDEX `fk_User_has_Project_User1_idx` (`user`),
    CONSTRAINT `fk_User_has_Project_User1`
     FOREIGN KEY (`user`) REFERENCES `user` (`id`)
         ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_User_has_Project_Project1`
     FOREIGN KEY (`project`) REFERENCES `project` (`id`)
         ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB;