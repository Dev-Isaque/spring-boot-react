package br.com.api.flowDesk.dto.task;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private LocalDate dueDate;
    private UUID projectId;
    private LocalDateTime createdAt;

}
