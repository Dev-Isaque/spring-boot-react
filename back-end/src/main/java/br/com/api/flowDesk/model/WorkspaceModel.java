package br.com.api.flowDesk.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "workspaces")
@Getter
@Setter
public class WorkspaceModel {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    private String name;
    private String color;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "workspace")
    private List<ProjectModel> projects;

    @OneToMany(mappedBy = "workspace")
    private List<LabelModel> labels;

    @OneToMany(mappedBy = "workspace")
    private List<WorkspaceMemberModel> members;
}
