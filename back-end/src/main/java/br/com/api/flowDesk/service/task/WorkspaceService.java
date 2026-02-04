package br.com.api.flowDesk.service.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.api.flowDesk.dto.task.CreateWorkspaceRequest;
import br.com.api.flowDesk.model.task.WorkspaceModel;
import br.com.api.flowDesk.repository.WorkspaceRepository;
import jakarta.transaction.Transactional;

@Service
public class WorkspaceService {

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Transactional
    public WorkspaceModel create(CreateWorkspaceRequest dto) {

        var workspace = new WorkspaceModel();
        workspace.setName(dto.getName());
        workspace.setColor(dto.getColor());

        return workspaceRepository.save(workspace);
    }
}