package br.com.api.flowDesk.controller.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.flowDesk.dto.task.CreateTaskRequest;
import br.com.api.flowDesk.model.task.TaskModel;
import br.com.api.flowDesk.service.task.TaskService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/cadastrar")
    public ResponseEntity<TaskModel> create(@RequestBody @Valid CreateTaskRequest dto) {
        String email = "eduarda@gmail.com"; // precisa existir no banco
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.create(dto, email));
    }

}
