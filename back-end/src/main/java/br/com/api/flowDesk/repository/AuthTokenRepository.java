package br.com.api.flowDesk.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.api.flowDesk.model.auth.AuthTokenModel;

public interface AuthTokenRepository extends JpaRepository<AuthTokenModel, UUID> {
    Optional<AuthTokenModel> findByToken(String token);
}
