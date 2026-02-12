package br.com.api.flowDesk.dto.task;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTaskRequest {

    private UUID projectId;
    private String title;
    private String description;
    private String priority;

    private LocalDateTime dueDateTime;

    private String estimatedTime;

    private Set<UUID> labelIds;

}
