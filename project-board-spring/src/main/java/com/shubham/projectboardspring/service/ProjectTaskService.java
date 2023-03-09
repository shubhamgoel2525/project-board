package com.shubham.projectboardspring.service;

import com.shubham.projectboardspring.models.ProjectTask;
import com.shubham.projectboardspring.repository.ProjectTaskRepository;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class ProjectTaskService {

    private final ProjectTaskRepository projectTaskRepository;

    public ProjectTaskService(ProjectTaskRepository projectTaskRepository) {
        this.projectTaskRepository = projectTaskRepository;
    }

    public ProjectTask saveOrUpdateProjectTask(ProjectTask projectTask) {

        if (projectTask.getStatus() == null || Objects.equals(projectTask.getStatus(), "")) {
            projectTask.setStatus("TODO");
        }

        return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask> findAll() {

        return projectTaskRepository.findAll();
    }

    public Optional<ProjectTask> findById(Long id) {

        return projectTaskRepository.findById(id);
    }

    public void deleteById(Long id) {

        projectTaskRepository.deleteById(id);
    }
}
