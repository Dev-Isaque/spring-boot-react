package br.com.api.flowDesk.dto.task.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTagRequest {
    @NotBlank
    private String name;
}
