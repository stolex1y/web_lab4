package stolexiy.repository;

import org.springframework.data.repository.CrudRepository;
import stolexiy.model.User;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByLogin(String login);
}
