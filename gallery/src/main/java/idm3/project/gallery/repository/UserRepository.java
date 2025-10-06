package idm3.project.gallery.repository;


import idm3.project.gallery.model.Showcase;
import idm3.project.gallery.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    User findByUserNameAndPassword(String username, String password);
    // Method to find showcases by status

    boolean existsByUserName(String username);

    boolean existsByEmailAddress(String emailAddress);
//add any additions queries here
}

