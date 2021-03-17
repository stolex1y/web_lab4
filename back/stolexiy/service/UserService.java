package stolexiy.service;

import stolexiy.model.User;

public interface UserService {
    User findByLogin(String login);
    User save(User user);
    User findByLoginAndPass(String login, String pass);
}
