package br.com.api.flowDesk.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.api.flowDesk.model.task.TaskItemModel;

public interface TaskItemRepository extends JpaRepository<TaskItemModel, UUID> {

    List<TaskItemModel> findByTask_IdOrderByPositionAscCreatedAtAsc(UUID taskId);
}
