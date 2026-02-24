package br.com.api.flowDesk.controller.task;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.api.flowDesk.dto.task.CommentDTO;
import br.com.api.flowDesk.dto.task.request.CreateCommentRequest;
import br.com.api.flowDesk.service.auth.AuthTokenService;
import br.com.api.flowDesk.service.task.CommentService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("task/{taskId}/comments")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private AuthTokenService authTokenService;

    @GetMapping("/list-all")
    public ResponseEntity<List<CommentDTO>> listByTask(@PathVariable UUID taskId) {
        return ResponseEntity.ok(commentService.listByTask(taskId));
    }

    @PostMapping("/create")
    public ResponseEntity<CommentDTO> create(@RequestBody @Valid CreateCommentRequest dto,
            @RequestHeader("Authorization") String authorization) {

        String token = authorization.replace("Bearer ", "").trim();

        var user = authTokenService.requireUserByToken(token);

        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.create(dto, user));

    }
}
