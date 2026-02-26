package br.com.api.flowDesk.service.task;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.api.flowDesk.dto.task.TagDTO;
import br.com.api.flowDesk.dto.task.request.CreateTagRequest;
import br.com.api.flowDesk.model.task.TagModel;
import br.com.api.flowDesk.model.task.WorkspaceModel;
import br.com.api.flowDesk.repository.task.TagRepository;
import br.com.api.flowDesk.repository.task.WorkspaceRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    private final WorkspaceRepository workspaceRepository;

    public List<TagModel> listByProject(UUID workspaceId) {
        return tagRepository.findByWorkspace_Id(workspaceId);
    }

    @Transactional
    public TagDTO create(UUID workspaceId, CreateTagRequest dto, String userEmail) {

        WorkspaceModel workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new RuntimeException("Workspace não encontrado"));

        TagModel tag = new TagModel();
        tag.setName(dto.getName());
        tag.setWorkspace(workspace);

        tagRepository.save(tag);

        return new TagDTO(tag.getId(), tag.getName());
    }
}