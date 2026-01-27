package br.com.api.produtos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.api.produtos.dto.UserDTO;
import br.com.api.produtos.model.UserModel;
import br.com.api.produtos.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository ur;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserModel> findAll() {
        return ur.findAll();
    }

    public UserModel findById(Long id) {
        return ur.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public UserModel findByEmail(String email) {
        return ur.findByEmail(email).orElse(null);
    }

    public UserModel create(UserDTO dto) {

        if (!dto.getPassword().equals(dto.getPassword_confirm())) {
            throw new RuntimeException("As senhas não conferem");
        }

        if (ur.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Esse email já está cadastrado.");
        }

        UserModel user = new UserModel();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        return ur.save(user);
    }

    public UserModel update(Long id, UserDTO dto) {

        UserModel user = ur.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário Não Encontrado"));

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        return ur.save(user);
    }

}
