package br.com.api.flowDesk.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.api.flowDesk.model.task.ProjectModel;

public interface ProjectRepository extends JpaRepository<ProjectModel, UUID> {

}
