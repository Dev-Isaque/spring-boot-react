package br.com.api.flowDesk.service.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.api.flowDesk.dto.task.CommentDTO;
import br.com.api.flowDesk.dto.task.request.CreateCommentRequest;
import br.com.api.flowDesk.model.task.CommentModel;
import br.com.api.flowDesk.model.task.TaskModel;
import br.com.api.flowDesk.model.user.UserModel;
import br.com.api.flowDesk.repository.task.CommentsRepository;
import br.com.api.flowDesk.repository.task.TaskRepository;
import jakarta.transaction.Transactional;

@Service
public class CommentService {

    @Autowired
    private CommentsRepository commentRepository;
    @Autowired
    private TaskRepository taskRepository;

    private CommentDTO toDTO(CommentModel save) {
        return new CommentDTO(
                save.getId(),
                save.getContent(),
                save.getAuthor().getId(),
                save.getAuthor().getName(),
                save.getTask().getId(),
                save.getCreatedAt(),
                save.getUpdatedAt());
    }

    @Transactional
    public CommentDTO create(CreateCommentRequest dto, UserModel user) {

        TaskModel task = taskRepository.findById(dto.getTaskId())
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));

        var comment = new CommentModel();
        comment.setContent(dto.getContent());
        comment.setAuthor(user);
        comment.setTask(task);

        return toDTO(commentRepository.save(comment));
    }

}
