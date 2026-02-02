package br.com.api.flowDesk.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.api.flowDesk.model.ProdutoModel;

@Repository
public interface ProdutoRepository extends CrudRepository<ProdutoModel, Long> {

}
