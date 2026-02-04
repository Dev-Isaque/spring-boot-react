package br.com.api.flowDesk.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.api.flowDesk.model.task.LabelModel;

public interface LabelRepository extends JpaRepository<LabelModel, UUID> {

}
