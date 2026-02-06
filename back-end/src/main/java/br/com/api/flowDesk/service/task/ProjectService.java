package br.com.api.flowDesk.service.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.api.flowDesk.dto.task.CreateProjectRequest;
import br.com.api.flowDesk.model.task.ProjectModel;
import br.com.api.flowDesk.model.user.UserModel;
import br.com.api.flowDesk.repository.ProjectRepository;
import br.com.api.flowDesk.repository.WorkspaceMemberRepository;
import br.com.api.flowDesk.repository.WorkspaceRepository;
import jakarta.transaction.Transactional;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private WorkspaceRepository workspaceRepository;
    @Autowired
    private WorkspaceMemberRepository workspaceMemberRepository;

    @Transactional
    public ProjectModel create(CreateProjectRequest dto, UserModel user) {

        var workspace = workspaceRepository.findById(dto.getWorkspaceId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Workspace não encontrado"));

        boolean isMember = workspaceMemberRepository.existsByWorkspaceIdAndUserId(workspace.getId(), user.getId());
        if (!isMember) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Você não tem acesso a esse workspace");
        }

        var project = new ProjectModel();
        project.setWorkspace(workspace);
        project.setName(dto.getName());
        project.setDescription(dto.getDescription());

        return projectRepository.save(project);
    }
}