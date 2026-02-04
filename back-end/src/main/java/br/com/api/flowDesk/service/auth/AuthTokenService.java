package br.com.api.flowDesk.service.auth;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.api.flowDesk.model.auth.AuthTokenModel;
import br.com.api.flowDesk.model.user.UserModel;
import br.com.api.flowDesk.repository.AuthTokenRepository;

@Service
public class AuthTokenService {

    @Autowired
    private AuthTokenRepository repo;

    public UserModel requireUserByToken(String token) {

        AuthTokenModel session = repo.findByToken(token)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token inválido"));

        if (session.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token expirado");
        }

        return session.getUser();
    }
}
