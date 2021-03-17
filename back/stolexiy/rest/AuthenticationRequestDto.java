package stolexiy.rest;

import com.google.gson.Gson;

public class AuthenticationRequestDto {
    private String login;
    private String pass;

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

    public static AuthenticationRequestDto fromJson(String objStr) {
        Gson gson = new Gson();
        return gson.fromJson(objStr, AuthenticationRequestDto.class);
    }
}
