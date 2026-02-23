package br.com.api.flowDesk.dto.task;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentDTO {

    private UUID id;

    private String content;

    private UUID authorId;
    private String authorName;

    private UUID taskId;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
