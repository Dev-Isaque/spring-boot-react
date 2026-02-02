package br.com.api.flowDesk.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

import br.com.api.flowDesk.model.ProdutoModel;
import br.com.api.flowDesk.service.ProdutoService;

@RestController
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoService ps;

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody ProdutoModel pm) {
        return ps.cadastrar(pm);
    }

    @PostMapping("/atualizar/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody ProdutoModel pm) {
        pm.setId(id);
        return ps.atualizar(pm);
    }

    @DeleteMapping("/remover/{id}")
    public ResponseEntity<?> remover(@PathVariable Long id) {
        return ps.remover(id);
    }

    @GetMapping("/listarTodos")
    public Iterable<ProdutoModel> listarTodos() {
        return ps.listarTodos();
    }

    @GetMapping("/")
    public String rota() {
        return "API de Produtos funcionando!";
    }
}
