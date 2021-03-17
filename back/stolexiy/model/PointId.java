package stolexiy.model;

import com.google.common.base.Objects;

import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import java.io.Serializable;

@Embeddable
public class PointId implements Serializable {
    @GeneratedValue
    private long id;
    private String login;

    public PointId(long id, String login) {
        this.id = id;
        this.login = login;
    }

    public PointId() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id, login);
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof PointId) {
            PointId other = (PointId) obj;
            return this.id == other.id && this.login.equals(other.login);
        } else
            return false;
    }
}
