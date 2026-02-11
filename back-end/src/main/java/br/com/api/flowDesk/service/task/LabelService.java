package br.com.api.flowDesk.service.task;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.api.flowDesk.model.task.LabelModel;
import br.com.api.flowDesk.repository.LabelRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LabelService {

    @Autowired
    private LabelRepository labelRepository;

    public List<LabelModel> listByWorkspace(UUID workspaceId) {
        return labelRepository.findByWorkspace_Id(workspaceId);
    }
}
