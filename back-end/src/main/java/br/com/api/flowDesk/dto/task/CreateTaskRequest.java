package br.com.api.flowDesk.dto.task;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

public class CreateTaskRequest {
    private UUID projectId;
    private String title;
    private String description;
    private String priority;
    private LocalDate dueDate;
    private Set<UUID> labelIds;

    public UUID getProjectId() {
        return projectId;
    }

    public void setProjectId(UUID projectId) {
        this.projectId = projectId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public Set<UUID> getLabelIds() {
        return labelIds;
    }

    public void setLabelIds(Set<UUID> labelIds) {
        this.labelIds = labelIds;
    }

}
