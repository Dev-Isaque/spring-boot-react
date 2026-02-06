package br.com.api.flowDesk.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.api.flowDesk.model.task.WorkspaceMemberModel;

public interface WorkspaceMemberRepository extends JpaRepository<WorkspaceMemberModel, UUID> {

    @Query("""
              select count(m) > 0
              from WorkspaceMemberModel m
              where m.workspace.id = :workspaceId
                and m.user.id = :userId
            """)
    boolean existsByWorkspaceIdAndUserId(UUID workspaceId, UUID userId);
}