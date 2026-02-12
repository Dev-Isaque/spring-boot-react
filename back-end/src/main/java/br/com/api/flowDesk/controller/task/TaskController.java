package br.com.api.flowDesk.controller.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.flowDesk.dto.task.CreateTaskRequest;
import br.com.api.flowDesk.dto.task.TaskDTO;
import br.com.api.flowDesk.service.auth.AuthTokenService;
import br.com.api.flowDesk.service.task.TaskService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private AuthTokenService authTokenService;

    @PostMapping("/register")
    public ResponseEntity<TaskDTO> create(
            @RequestBody @Valid CreateTaskRequest dto,
            @RequestHeader("Authorization") String authorization) {

        String token = authorization.replace("Bearer ", "").trim();

        var user = authTokenService.requireUserByToken(token);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(taskService.create(dto, user.getEmail()));
    }
}
