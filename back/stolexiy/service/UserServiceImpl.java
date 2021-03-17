package stolexiy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import stolexiy.model.User;
import stolexiy.repository.UserRepository;

@Service @Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           BCryptPasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    @Override
    public User findByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    @Transactional(readOnly = true)
    @Override
    public User findByLoginAndPass(String login, String pass) {
        User foundUser = findByLogin(login);
        if (foundUser != null) {
            if (passwordEncoder.matches(pass, foundUser.getPass()))
                return foundUser;
        }
        return null;
    }

    @Override
    public User save(User user) {
        user.setPass(passwordEncoder.encode(user.getPass()));
        return userRepository.save(user);
    }
}
