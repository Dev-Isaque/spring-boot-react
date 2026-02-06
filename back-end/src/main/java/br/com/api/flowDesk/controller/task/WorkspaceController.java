package br.com.api.flowDesk.controller.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.flowDesk.dto.task.CreateWorkspaceRequest;
import br.com.api.flowDesk.dto.task.WorkspaceResponse;
import br.com.api.flowDesk.model.task.WorkspaceModel;
import br.com.api.flowDesk.model.user.UserModel;
import br.com.api.flowDesk.service.auth.AuthTokenService;
import br.com.api.flowDesk.service.task.WorkspaceService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/workspaces")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class WorkspaceController {

    @Autowired
    private WorkspaceService workspaceService;

    @Autowired
    private AuthTokenService authTokenService;

    @PostMapping("/cadastrar")
    public ResponseEntity<WorkspaceModel> create(@RequestBody @Valid CreateWorkspaceRequest dto) {
        var created = workspaceService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/personal")
    public ResponseEntity<WorkspaceResponse> personal(@RequestHeader("Authorization") String authHeader) {
        System.out.println(">>> /workspaces/personal chamado");

        String token = authHeader.replace("Bearer ", "").trim();
        UserModel user = authTokenService.requireUserByToken(token);

        var ws = workspaceService.getOrCreatePersonal(user);

        System.out.println(">>> workspace encontrado/criado: " + (ws != null ? ws.getId() : "NULL"));

        return ResponseEntity.ok(new WorkspaceResponse(
                ws.getId(),
                ws.getName(),
                ws.getColor(),
                ws.getType()));
    }
}
