package com.shubham.projectboardspring.controller;

import com.shubham.projectboardspring.models.ProjectTask;
import com.shubham.projectboardspring.service.ProjectTaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/board")
@CrossOrigin
public class ProjectTaskController {

    private final ProjectTaskService projectTaskService;

    public ProjectTaskController(ProjectTaskService projectTaskService) {
        this.projectTaskService = projectTaskService;
    }

    // TODO: remove wildcard
    @PostMapping("")
    public ResponseEntity<?> addProjectTaskToBoard(@Valid @RequestBody ProjectTask projectTask, BindingResult result) {

        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();

            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }

            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }

        ProjectTask newProjectTask = projectTaskService.saveOrUpdateProjectTask(projectTask);

        return new ResponseEntity<>(newProjectTask, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<ProjectTask>> getAllProjectTasks() {

        Iterable<ProjectTask> itr = projectTaskService.findAll();

        return new ResponseEntity<>(itr, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<ProjectTask>> getProjectTaskById(@PathVariable Long id) {

        Optional<ProjectTask> projectTask = projectTaskService.findById(id);

        return new ResponseEntity<>(projectTask, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProjectTaskById(@PathVariable Long id) {

        if (projectTaskService.findById(id).isEmpty()) {
            return new ResponseEntity<>("Project task not found", HttpStatus.NOT_FOUND);
        }

        projectTaskService.deleteById(id);

        return new ResponseEntity<>("Project task deleted successfully", HttpStatus.OK);
    }
}
