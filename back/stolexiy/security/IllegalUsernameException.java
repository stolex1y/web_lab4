package stolexiy.security;

import org.springframework.security.core.AuthenticationException;

public class IllegalUsernameException extends AuthenticationException {
    public IllegalUsernameException(String msg, Throwable t) {
        super(msg, t);
    }

    public IllegalUsernameException(String msg) {
        super(msg);
    }
}
