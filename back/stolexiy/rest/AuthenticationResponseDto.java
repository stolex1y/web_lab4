package stolexiy.rest;

public class AuthenticationResponseDto {
    private boolean success;
    private String token;

    public AuthenticationResponseDto(String token) {
        this.token = token;
        this.success = this.token != null;
    }

    public AuthenticationResponseDto() {
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
        this.success = this.token != null;
    }

    public boolean isSuccess() {
        return success;
    }
}
