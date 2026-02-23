package br.com.api.flowDesk.dto.task.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateWorkspaceRequest {

    @NotBlank(message = "name é obrigatório")
    private String name;

    private String color;
}