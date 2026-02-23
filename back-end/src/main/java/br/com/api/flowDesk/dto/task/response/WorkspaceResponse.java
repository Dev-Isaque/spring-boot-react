package br.com.api.flowDesk.dto.task.response;

import java.util.UUID;

import br.com.api.flowDesk.enums.WorkspaceType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WorkspaceResponse {
    private UUID id;
    private String name;
    private String color;
    private WorkspaceType type;
}
