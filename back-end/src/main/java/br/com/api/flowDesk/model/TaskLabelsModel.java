package br.com.api.flowDesk.model;

import java.util.UUID;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "task_labels")
@Getter
@Setter
public class TaskLabelsModel {

    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;

    @JoinColumn(name = "task_id", nullable = false)
    private TaskModel task_id;

    @JoinColumn(name = "label_id", nullable = false)
    private LabelModel label_id;

}
