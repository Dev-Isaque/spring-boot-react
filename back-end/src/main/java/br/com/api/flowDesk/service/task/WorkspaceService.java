package br.com.api.flowDesk.service.task;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.api.flowDesk.dto.task.CreateWorkspaceRequest;
import br.com.api.flowDesk.enums.WorkspaceType;
import br.com.api.flowDesk.model.task.WorkspaceMemberModel;
import br.com.api.flowDesk.model.task.WorkspaceModel;
import br.com.api.flowDesk.model.user.UserModel;
import br.com.api.flowDesk.repository.WorkspaceMemberRepository;
import br.com.api.flowDesk.repository.WorkspaceRepository;
import jakarta.transaction.Transactional;

@Service
public class WorkspaceService {

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Autowired
    private WorkspaceMemberRepository workspaceMemberRepository;

    @Transactional
    public WorkspaceModel create(CreateWorkspaceRequest dto) {

        var workspace = new WorkspaceModel();
        workspace.setName(dto.getName());
        workspace.setColor(dto.getColor());

        return workspaceRepository.save(workspace);
    }

    @Transactional
    public WorkspaceModel getOrCreatePersonal(UserModel user) {

        return workspaceRepository
                .findByTypeAndMemberUserId(WorkspaceType.PERSONAL, user.getId())
                .orElseGet(() -> {
                    WorkspaceModel ws = new WorkspaceModel();
                    ws.setName("Pessoal");
                    ws.setColor("#4f46e5");
                    ws.setType(WorkspaceType.PERSONAL);
                    ws = workspaceRepository.save(ws);

                    WorkspaceMemberModel member = new WorkspaceMemberModel();
                    member.setWorkspace(ws);
                    member.setUser(user);
                    member.setRole("OWNER");
                    workspaceMemberRepository.save(member);

                    return ws;
                });
    }
}