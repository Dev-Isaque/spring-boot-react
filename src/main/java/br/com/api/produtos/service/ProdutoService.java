package br.com.api.produtos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import br.com.api.produtos.model.ProdutoModel;
import br.com.api.produtos.model.RespostaModel;
import br.com.api.produtos.repository.ProdutoRepository;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository pr;

    @Autowired
    private RespostaModel rm;

    // Método para listar todos os produtos
    public Iterable<ProdutoModel> listarTodos() {
        return pr.findAll();
    }

    // Método para cadastrar um novo produto
    public ResponseEntity<?> cadastrar(ProdutoModel pm) {

        if (pm.getNome().equals("")) {
            rm.setMensagem("Erro: O nome do produto é obrigatório!");
            return new ResponseEntity<RespostaModel>(rm, HttpStatus.BAD_REQUEST);
        } else if (pm.getMarca().equals("")) {
            rm.setMensagem("Erro: O nome da marca é obrigatório!");
            return new ResponseEntity<RespostaModel>(rm, HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<ProdutoModel>(pr.save(pm), HttpStatus.CREATED);
        }

    }

    // Méotodo para atualizar um produto existente
    public ResponseEntity<?> atualizar(ProdutoModel pm) {
        if (pr.existsById(pm.getId())) {
            return new ResponseEntity<ProdutoModel>(pr.save(pm), HttpStatus.OK);
        } else {
            rm.setMensagem("Erro: Produto não encontrado para atualização!");
            return new ResponseEntity<RespostaModel>(rm, HttpStatus.NOT_FOUND);
        }
    }

    // Método para remover um produto
    public ResponseEntity<?> remover(Long id) {
        if (pr.existsById(id)) {
            pr.deleteById(id);
            rm.setMensagem("Produto removido com sucesso!");
            return new ResponseEntity<RespostaModel>(rm, HttpStatus.OK);
        } else {
            rm.setMensagem("Erro: Produto não encontrado para remoção!");
            return new ResponseEntity<RespostaModel>(rm, HttpStatus.NOT_FOUND);
        }
    }

}
