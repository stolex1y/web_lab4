package stolexiy.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import stolexiy.model.User;
import stolexiy.security.IllegalUsernameException;
import stolexiy.security.jwt.JwtTokenProvider;
import stolexiy.service.UserService;

@RestController
@RequestMapping(value="/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenProvider jwtTokenProvider, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseEntity<AuthenticationResponseDto> login(@RequestBody String requestDtoStr) {
        AuthenticationRequestDto requestDto = AuthenticationRequestDto.fromJson(requestDtoStr);
        User user = userService.findByLoginAndPass(requestDto.getLogin(),
                requestDto.getPass());
        if (user == null)
            return new ResponseEntity<>(new AuthenticationResponseDto(null),
                    HttpStatus.FORBIDDEN);
        String token = jwtTokenProvider.createToken(requestDto.getLogin());
        return new ResponseEntity<>(new AuthenticationResponseDto(
                "Bearer " + token), HttpStatus.OK);
    }

    @RequestMapping(value = "/register",
            method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public void register(@RequestBody String requestDtoStr) {
        AuthenticationRequestDto requestDto = AuthenticationRequestDto.fromJson(requestDtoStr);
        String login = requestDto.getLogin();
        User user = userService.findByLogin(login);
        if (user != null)
            throw new IllegalUsernameException("User with login " + login +
                    " is already registered");
        user = new User(login, requestDto.getPass());
        userService.save(user);
//        String token = jwtTokenProvider.createToken(login);

    }
}
