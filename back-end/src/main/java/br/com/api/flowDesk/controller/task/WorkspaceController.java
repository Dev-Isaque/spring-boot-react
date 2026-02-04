package br.com.api.flowDesk.controller.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.flowDesk.dto.task.CreateWorkspaceRequest;
import br.com.api.flowDesk.model.task.WorkspaceModel;
import br.com.api.flowDesk.service.task.WorkspaceService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/workspaces")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class WorkspaceController {
    @Autowired
    private WorkspaceService workspaceService;

    @PostMapping("/cadastrar")
    public ResponseEntity<WorkspaceModel> create(@RequestBody @Valid CreateWorkspaceRequest dto) {
        var created = workspaceService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
