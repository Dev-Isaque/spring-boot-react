package br.com.api.flowDesk.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.api.flowDesk.model.task.WorkspaceMemberModel;

public interface WorkspaceMemberRepository extends JpaRepository<WorkspaceMemberModel, UUID> {

}
