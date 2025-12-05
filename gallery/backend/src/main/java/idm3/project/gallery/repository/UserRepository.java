package idm3.project.gallery.repository;


import idm3.project.gallery.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmailAndPassword(String email, String password);

    boolean existsByEmail(String emailAddress);
//add any additions queries here
// Get users by type (Admin, Employer, Student)
List<User> findByType(User.Type type);

    // Get a single user with all liked projects eagerly fetched
    @Query("SELECT DISTINCT u FROM User u " +
            "LEFT JOIN FETCH u.likedProjects lp " +
            "LEFT JOIN FETCH lp.project " +
            "WHERE u.id = :id")
    Optional<User> findByIdWithLikedProjects(@Param("id") Integer id);
}

