package br.com.api.produtos.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.api.produtos.dto.AuthResponseDTO;
import br.com.api.produtos.dto.LoginDTO;
import br.com.api.produtos.dto.UserResponseDTO;
import br.com.api.produtos.model.UserModel;

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
