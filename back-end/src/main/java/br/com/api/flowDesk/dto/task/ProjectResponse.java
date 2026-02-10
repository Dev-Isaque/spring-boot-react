package br.com.api.flowDesk.dto.task;

import java.util.UUID;

public record ProjectResponse(
        UUID id,
        String name,
        String description) {
}