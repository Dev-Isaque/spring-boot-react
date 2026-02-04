package br.com.api.flowDesk.controller.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.api.flowDesk.dto.task.CreateProjectRequest;
import br.com.api.flowDesk.model.task.ProjectModel;
import br.com.api.flowDesk.service.task.ProjectService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @PostMapping("/cadastrar")
    public ResponseEntity<ProjectModel> create(@RequestBody @Valid CreateProjectRequest dto) {
        var created = projectService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}