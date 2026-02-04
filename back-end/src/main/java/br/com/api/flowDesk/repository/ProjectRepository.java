package br.com.api.flowDesk.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.api.flowDesk.model.task.ProjectModel;

public interface ProjectRepository extends JpaRepository<ProjectModel, UUID> {

    @Query("""
                SELECT p
                FROM ProjectModel p
                JOIN p.workspace w
                JOIN w.members m
                WHERE m.user.id = :userId
            """)
    List<ProjectModel> findProjectsByUser(@Param("userId") UUID userId);

}
