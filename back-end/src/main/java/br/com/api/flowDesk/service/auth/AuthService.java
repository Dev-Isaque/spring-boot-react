package br.com.api.flowDesk.service.auth;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.api.flowDesk.dto.auth.AuthResponseDTO;
import br.com.api.flowDesk.dto.auth.LoginDTO;
import br.com.api.flowDesk.dto.auth.UserResponseDTO;
import br.com.api.flowDesk.model.user.UserModel;
import br.com.api.flowDesk.service.user.UserService;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponseDTO login(LoginDTO dto) {

        UserModel user = userService.findByEmail(dto.getEmail());

        if (user == null || !passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Email ou senha inválidos");
        }

        String token = UUID.randomUUID().toString();

        UserResponseDTO userResponse = new UserResponseDTO(
                user.getName(),
                user.getEmail());

        return new AuthResponseDTO(true, token, userResponse);
    }

}
