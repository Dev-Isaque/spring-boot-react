package br.com.api.flowDesk.dto.task;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

import br.com.api.flowDesk.enums.task.TaskPriority;
import br.com.api.flowDesk.enums.task.TaskStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTaskRequest {

    private UUID projectId;
    private String title;
    private String description;

    private TaskStatus status;
    private TaskPriority priority;

    private LocalDateTime dueDateTime;

    private String estimatedTime;

    private Set<UUID> labelIds;

}
