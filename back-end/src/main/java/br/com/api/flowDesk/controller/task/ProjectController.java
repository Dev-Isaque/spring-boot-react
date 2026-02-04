package br.com.api.flowDesk.controller.task;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.api.flowDesk.dto.task.CreateProjectRequest;
import br.com.api.flowDesk.model.task.ProjectModel;
import br.com.api.flowDesk.model.user.UserModel;
import br.com.api.flowDesk.repository.ProjectRepository;
import br.com.api.flowDesk.service.auth.AuthTokenService;
import br.com.api.flowDesk.service.task.ProjectService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private AuthTokenService authTokenService;

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/cadastrar")
    public ResponseEntity<ProjectModel> create(@RequestBody @Valid CreateProjectRequest dto) {
        var created = projectService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public List<ProjectModel> myProjects(@RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "").trim();

        UserModel user = authTokenService.requireUserByToken(token);

        return projectRepository.findProjectsByUser(user.getId());
    }
}