package br.com.api.flowDesk.controller.task;

import java.util.List;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.flowDesk.model.task.LabelModel;
import br.com.api.flowDesk.service.task.LabelService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/labels")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequiredArgsConstructor
public class LabelController {

    private final LabelService labelService;

    @GetMapping("/workspace/{workspaceId}")
    public List<LabelModel> listByWorkspace(@PathVariable UUID workspaceId) {
        return labelService.listByWorkspace(workspaceId);
    }
}
