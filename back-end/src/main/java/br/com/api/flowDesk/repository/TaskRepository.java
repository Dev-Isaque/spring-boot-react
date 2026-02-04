package br.com.api.flowDesk.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.api.flowDesk.model.task.TaskModel;

@Repository
public interface TaskRepository extends JpaRepository<TaskModel, UUID> {

}
