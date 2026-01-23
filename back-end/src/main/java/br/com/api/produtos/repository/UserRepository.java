package br.com.api.produtos.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.api.produtos.model.UserModel;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Long> {

}
