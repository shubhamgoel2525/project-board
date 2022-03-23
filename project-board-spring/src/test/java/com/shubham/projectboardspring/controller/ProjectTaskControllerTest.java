package com.shubham.projectboardspring.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.shubham.projectboardspring.domain.ProjectTask;
import com.shubham.projectboardspring.repository.ProjectTaskRepository;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
public class ProjectTaskControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @MockBean
    ProjectTaskRepository projectTaskRepository;

    ProjectTask PROJECT_TASK_1 = new ProjectTask(1L, "Sample1", "Sample1", "IN_PROGRESS");
    ProjectTask PROJECT_TASK_2 = new ProjectTask(2L, "Sample2", "Sample2", "DONE");
    ProjectTask PROJECT_TASK_3 = new ProjectTask(3L, "Sample3", "Sample3", "TO_DO");

    @Test
    public void getAllProjectTasks_success() throws Exception {
        List<ProjectTask> records = new ArrayList<>(Arrays.asList(PROJECT_TASK_1, PROJECT_TASK_2, PROJECT_TASK_3));

        Mockito.when(projectTaskRepository.findAll()).thenReturn(records);

        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/board/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(3)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[2].summary", Matchers.is("Sample3")));
    }
}
