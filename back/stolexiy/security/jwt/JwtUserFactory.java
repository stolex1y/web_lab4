package stolexiy.security.jwt;

import stolexiy.model.User;

public class JwtUserFactory {
    public JwtUserFactory() {}

    public static JwtUser create(User user) {
        return new JwtUser(
                user.getId(),
                user.getLogin(),
                user.getPass()
        );
    }
}
