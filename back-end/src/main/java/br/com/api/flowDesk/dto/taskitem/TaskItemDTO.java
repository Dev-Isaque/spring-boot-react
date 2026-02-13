package br.com.api.flowDesk.dto.taskitem;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TaskItemDTO {
    private UUID id;
    private UUID taskId;
    private String title;
    private Boolean done;
    private Integer position;
    private LocalDateTime createdAt;
}
