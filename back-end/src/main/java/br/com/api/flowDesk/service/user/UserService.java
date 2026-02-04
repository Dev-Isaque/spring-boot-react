package br.com.api.flowDesk.service.user;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.api.flowDesk.dto.user.UserDTO;
import br.com.api.flowDesk.enums.WorkspaceType;
import br.com.api.flowDesk.model.task.ProjectModel;
import br.com.api.flowDesk.model.task.WorkspaceMemberModel;
import br.com.api.flowDesk.model.task.WorkspaceModel;
import br.com.api.flowDesk.model.user.UserModel;
import br.com.api.flowDesk.repository.ProjectRepository;
import br.com.api.flowDesk.repository.UserRepository;
import br.com.api.flowDesk.repository.WorkspaceMemberRepository;
import br.com.api.flowDesk.repository.WorkspaceRepository;
import jakarta.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository ur;

    @Autowired
    private WorkspaceRepository workspaceRepository;

    @Autowired
    private WorkspaceMemberRepository workspaceMemberRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UserModel> findAll() {
        return ur.findAll();
    }

    public UserModel findById(UUID id) {
        return ur.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public UserModel findByEmail(String email) {
        return ur.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    @Transactional
    public UserModel create(UserDTO dto) {

        if (!dto.getPassword().equals(dto.getPassword_confirm())) {
            throw new RuntimeException("As senhas não conferem");
        }

        if (ur.findByEmail(dto.getEmail()).isPresent()) {
            throw new RuntimeException("Esse email já está cadastrado.");
        }

        // 1) Cria usuário
        UserModel user = new UserModel();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        user = ur.save(user);

        // 2) Cria workspace pessoal
        WorkspaceModel workspace = new WorkspaceModel();
        workspace.setName("Pessoal");
        workspace.setColor("#4f46e5");
        workspace.setType(WorkspaceType.PERSONAL);

        workspace = workspaceRepository.save(workspace);

        WorkspaceMemberModel member = new WorkspaceMemberModel();
        member.setWorkspace(workspace);
        member.setUser(user);
        member.setRole("OWNER");

        workspaceMemberRepository.save(member);

        ProjectModel project = new ProjectModel();
        project.setWorkspace(workspace);
        project.setName("Inbox");
        project.setDescription("Tarefas pessoais");

        projectRepository.save(project);

        return user;
    }

    public UserModel update(UUID id, UserDTO dto) {

        UserModel user = ur.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário Não Encontrado"));

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());

        if (!dto.getPassword().equals(dto.getPassword_confirm())) {
            throw new RuntimeException("As senhas não conferem");
        }

        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        return ur.save(user);
    }
}
