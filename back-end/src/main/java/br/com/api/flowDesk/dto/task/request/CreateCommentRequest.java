package br.com.api.flowDesk.dto.task.request;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCommentRequest {

    @NotNull(message = "content é obrigatório")
    private String content;

    @NotNull(message = "authorId é obrigatório")
    private UUID authorId;

    @NotNull(message = "taskId é obrigatório")
    private UUID taskId;
}
