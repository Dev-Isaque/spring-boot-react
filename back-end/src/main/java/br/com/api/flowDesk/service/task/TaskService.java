package br.com.api.flowDesk.service.task;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.api.flowDesk.dto.task.CreateTaskRequest;
import br.com.api.flowDesk.dto.task.LabelDTO;
import br.com.api.flowDesk.dto.task.TaskDTO;
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

    public List<TaskDTO> listByProject(UUID projectId) {
        return taskRepository.findByProjectId(projectId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<TaskDTO> listByWorkspace(UUID workspaceId) {
        return taskRepository.findByProject_Workspace_Id(workspaceId)
                .stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private TaskDTO toDTO(TaskModel task) {

        var labelDTOs = task.getLabels()
                .stream()
                .map(label -> new LabelDTO(
                        label.getId(),
                        label.getName(),
                        label.getColor()))
                .toList();

        return new TaskDTO(
                task.getId(),
                task.getTitle(),
                task.getStatus(),
                task.getPriority(),
                task.getDueDate(),
                task.getProject().getId(),
                task.getCreatedAt(),
                labelDTOs);
    }

    @Transactional
    public TaskDTO create(CreateTaskRequest dto, String loggedEmail) {

        var project = projectRepository.findById(dto.getProjectId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Projeto não encontrado"));

        var user = userRepository.findByEmail(loggedEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário inválido"));

        if (dto.getTitle() == null || dto.getTitle().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Título é obrigatório");
        }

        var task = new TaskModel();
        task.setProject(project);
        task.setTitle(dto.getTitle().trim());
        task.setDescription(dto.getDescription() != null ? dto.getDescription().trim() : null);

        task.setPriority(dto.getPriority() != null ? dto.getPriority() : "MEDIUM");
        task.setStatus("TODO");
        task.setDueDate(dto.getDueDate());
        task.setCreatedBy(user);

        if (dto.getLabelIds() != null && !dto.getLabelIds().isEmpty()) {

            var labels = labelRepository.findAllById(dto.getLabelIds());

            if (labels.size() != dto.getLabelIds().size()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Uma ou mais labels não existem");
            }

            var workspaceId = project.getWorkspace().getId();

            boolean anyFromOtherWorkspace = labels.stream()
                    .anyMatch(l -> !l.getWorkspace().getId().equals(workspaceId));

            if (anyFromOtherWorkspace) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Label de outro workspace não é permitida");
            }

            task.getLabels().addAll(labels);
        }

        return toDTO(taskRepository.save(task));
    }
}
