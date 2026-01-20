package br.com.api.produtos.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController /*  */
@RequestMapping("/api/produtos")
public class ProdutoController {

    @GetMapping
    public List<String> listar() {
        return List.of("Mouse", "Teclado", "Monitor");
    }
}
