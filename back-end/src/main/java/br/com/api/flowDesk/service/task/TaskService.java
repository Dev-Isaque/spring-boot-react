package br.com.api.flowDesk.service.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.api.flowDesk.dto.task.CreateTaskRequest;
import br.com.api.flowDesk.model.task.TaskModel;
import br.com.api.flowDesk.repository.LabelRepository;
import br.com.api.flowDesk.repository.ProjectRepository;
import br.com.api.flowDesk.repository.TaskRepository;
import br.com.api.flowDesk.repository.UserRepository;
import jakarta.transaction.Transactional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LabelRepository labelRepository;

    @Transactional
    public TaskModel create(CreateTaskRequest dto, String loggedEmail) {

        var project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Projeto não encontrado"));

        var user = userRepository.findByEmail(loggedEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário inválido"));

        var task = new TaskModel();
        task.setProject(project);
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setPriority(dto.getPriority() != null ? dto.getPriority() : "MEDIUM");
        task.setStatus("TODO");
        task.setDueDate(dto.getDueDate());
        task.setCreatedBy(user);

        if (dto.getLabelIds() != null && !dto.getLabelIds().isEmpty()) {
            var labels = labelRepository.findAllById(dto.getLabelIds());
            task.getLabels().addAll(labels);
        }

        return taskRepository.save(task);
    }
}
