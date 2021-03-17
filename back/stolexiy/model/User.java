package stolexiy.model;

import com.google.gson.Gson;

import javax.persistence.*;
import java.lang.reflect.Field;
import java.util.Arrays;

@Entity
@Table(name = "USERS")
public class User {
    @Id @GeneratedValue
    private long id;

    private String login;
    private String pass;

    public User() {}

    public User(String login, String pass) {
        this.login = login;
        this.pass = pass;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof User) {
            User other = (User) obj;
            return this.login.equals(other.login) && this.pass.equals(other.pass);
        }
        return false;
    }

    public long getId() {
        return id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }
}
