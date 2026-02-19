package br.com.api.flowDesk.dto.taskitem;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TaskProgressDTO {

    private UUID taskId;
    private long totalItems;
    private long completedItems;
    private double percentage;
}