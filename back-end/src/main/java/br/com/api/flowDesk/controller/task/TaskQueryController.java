package br.com.api.flowDesk.controller.task;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.flowDesk.dto.task.TaskDTO;
import br.com.api.flowDesk.service.task.TaskService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class TaskQueryController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/workspaces/{workspaceId}/tasks")
    public List<TaskDTO> listByWorkspace(@PathVariable UUID workspaceId) {
        return taskService.listByWorkspace(workspaceId);
    }

    @GetMapping("/projects/{projectId}/tasks")
    public List<TaskDTO> listByProject(@PathVariable UUID projectId) {
        return taskService.listByProject(projectId);
    }
}
