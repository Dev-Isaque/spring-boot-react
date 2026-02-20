package br.com.api.flowDesk.dto.task;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import br.com.api.flowDesk.enums.task.TaskPriority;
import br.com.api.flowDesk.enums.task.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TaskDTO {

    private UUID id;
    private String title;

    private TaskStatus status;
    private TaskPriority priority;

    private LocalDateTime dueDateTime;
    private String estimatedTime;

    private UUID projectId;
    private UUID createdById;

    private String createdByName;

    private LocalDateTime createdAt;
    private List<LabelDTO> labels;
}
