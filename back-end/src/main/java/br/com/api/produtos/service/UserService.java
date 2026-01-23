package br.com.api.produtos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.produtos.model.RespostaModel;
import br.com.api.produtos.model.UserModel;
import br.com.api.produtos.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository ur;

    @Autowired
    private RespostaModel rm;

    public ResponseEntity<?> listarTodos() {
        return ResponseEntity.ok(ur.findAll());
    }

    public ResponseEntity<?> cadastrar(UserModel um) {
        return ResponseEntity.ok(ur.save(um));
    }

}
