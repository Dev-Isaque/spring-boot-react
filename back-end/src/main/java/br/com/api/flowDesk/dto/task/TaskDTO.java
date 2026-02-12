package br.com.api.flowDesk.dto.task;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TaskDTO {

    private UUID id;
    private String title;
    private String status;
    private String priority;

    private LocalDateTime dueDateTime;
    private String estimatedTime;

    private UUID projectId;
    private LocalDateTime createdAt;
    private List<LabelDTO> labels;
}
