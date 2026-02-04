package br.com.api.flowDesk.dto.auth;

public class UserResponseDTO {

    private String name;
    private String email;

    public UserResponseDTO(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }
}
