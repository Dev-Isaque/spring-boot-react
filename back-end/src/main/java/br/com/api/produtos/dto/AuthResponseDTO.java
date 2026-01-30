package br.com.api.produtos.dto;

public class AuthResponseDTO {

    private boolean sucesso;
    private String token;
    private UserResponseDTO usuario;

    public AuthResponseDTO(boolean sucesso, String token, UserResponseDTO usuario) {
        this.sucesso = sucesso;
        this.token = token;
        this.usuario = usuario;
    }

    public boolean isSucesso() {
        return sucesso;
    }

    public String getToken() {
        return token;
    }

    public UserResponseDTO getUsuario() {
        return usuario;
    }
}
