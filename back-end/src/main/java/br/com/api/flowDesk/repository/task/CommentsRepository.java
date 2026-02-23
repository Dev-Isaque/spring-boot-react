package br.com.api.flowDesk.repository.task;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.api.flowDesk.model.task.CommentModel;

public interface CommentsRepository extends JpaRepository<CommentModel, UUID> {
    List<CommentModel> findByTask_Id(UUID taskId);
}
