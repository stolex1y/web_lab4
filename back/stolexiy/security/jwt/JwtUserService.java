package stolexiy.security.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import stolexiy.model.User;
import stolexiy.security.jwt.JwtUserFactory;
import stolexiy.service.UserService;

@Service
public class JwtUserService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findByLogin(username);
        if (user == null)
            throw new UsernameNotFoundException("User with username: " + username +
                    " - not found");
        return JwtUserFactory.create(user);
    }
}
