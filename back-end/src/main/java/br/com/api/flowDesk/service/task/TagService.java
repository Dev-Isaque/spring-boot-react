package br.com.api.flowDesk.service.task;

import java.util.List;
import java.util.Optional;
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

    /**
     * Lista todas as tags disponíveis num workspace específico.
     */
    public List<TagDTO> listByWorkspace(UUID workspaceId) {
        return tagRepository.findByWorkspace_Id(workspaceId);
    }

    /**
     * Cria uma nova tag ou retorna uma existente caso o nome já esteja em uso no
     * workspace.
     */
    @Transactional
    public TagDTO create(UUID workspaceId, CreateTagRequest dto, String userEmail) {

        // 1. Limpamos o nome (remove espaços extras)
        String cleanedName = dto.getName().trim();

        // 2. Verificamos se a tag já existe para este workspace (ignora
        // maiúsculas/minúsculas)
        Optional<TagModel> existingTag = tagRepository.findByWorkspaceIdAndNameIgnoreCase(workspaceId, cleanedName);

        if (existingTag.isPresent()) {
            // Se já existir, retornamos a tag existente sem criar uma nova
            TagModel tag = existingTag.get();
            return new TagDTO(tag.getId(), tag.getName());
        }

        // 3. Se não existir, precisamos do Workspace para criar a nova
        WorkspaceModel workspace = workspaceRepository.findById(workspaceId)
                .orElseThrow(() -> new RuntimeException("Workspace não encontrado"));

        TagModel newTag = new TagModel();
        newTag.setName(cleanedName);
        newTag.setWorkspace(workspace);

        tagRepository.save(newTag);

        return new TagDTO(newTag.getId(), newTag.getName());
    }
}