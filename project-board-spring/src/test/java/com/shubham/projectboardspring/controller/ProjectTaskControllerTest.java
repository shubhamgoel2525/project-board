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
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

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
    ProjectTask PROJECT_TASK_3 = new ProjectTask(3L, "Sample3", "Sample3", "TODO");

    @Test
    public void getAllProjectTasksTest() throws Exception {
        List<ProjectTask> records = new ArrayList<>(
                Arrays.asList(PROJECT_TASK_1, PROJECT_TASK_2, PROJECT_TASK_3));

        Mockito.when(projectTaskRepository.findAll()).thenReturn(records);

        mockMvc.perform(MockMvcRequestBuilders
                .get("/api/v1/board/all")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(3)))
                .andExpect(MockMvcResultMatchers.jsonPath("$[2].summary", Matchers.is("Sample3")));
    }

    @Test
    public void getProjectTaskByIdTest() throws Exception {
        Mockito.when(projectTaskRepository.findById(PROJECT_TASK_1.getId()))
                .thenReturn(Optional.of(PROJECT_TASK_1));

        mockMvc.perform(
                MockMvcRequestBuilders
                        .get("/api/v1/board/" + PROJECT_TASK_1.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.notNullValue()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.summary",
                        Matchers.is(PROJECT_TASK_1.getSummary())));
    }

    @Test
    public void createProjectTaskTest() throws Exception {
        ProjectTask record = ProjectTask.builder()
                .summary("Sample")
                .acceptanceCriteria("Sample")
                .status("TODO")
                .build();

        Mockito.when(projectTaskRepository.save(record)).thenReturn(record);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders
                .post("/api/v1/board")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(record));

        mockMvc.perform(mockRequest)
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.notNullValue()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.summary", Matchers.is("Sample")));
    }

    @Test
    public void createProjectTaskBadRequestTest() throws Exception {
        ProjectTask record = ProjectTask.builder()
                .acceptanceCriteria("Sample")
                .status("TODO")
                .build();

        Mockito.when(projectTaskRepository.save(record)).thenReturn(record);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders
                .post("/api/v1/board")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(record));

        mockMvc.perform(mockRequest)
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

/*
    TODO: Check why this test is not working
    @Test
    public void createProjectTaskWithoutStatusTest() throws Exception {
        ProjectTask record = ProjectTask.builder()
                .summary("Sample")
                .acceptanceCriteria("Sample")
                .build();

        Mockito.when(projectTaskRepository.save(record)).thenReturn(record);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders
                .post("/api/v1/board")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(record));

        mockMvc.perform(mockRequest)
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.notNullValue()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.status", Matchers.is("TODO")));
    }
*/

    @Test
    public void updateProjectTaskTest() throws Exception {
        ProjectTask updatedProjectTask = ProjectTask.builder()
                .id(1L)
                .summary("Sample")
                .acceptanceCriteria("Sample")
                .status("DONE")
                .build();

        Mockito.when(projectTaskRepository.findById(PROJECT_TASK_1.getId())).thenReturn(Optional.of(PROJECT_TASK_1));
        Mockito.when(projectTaskRepository.save(updatedProjectTask)).thenReturn(updatedProjectTask);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/api/v1/board")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(updatedProjectTask));

        mockMvc.perform(mockRequest)
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.notNullValue()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.summary", Matchers.is("Sample")));
    }

    @Test
    public void deleteProjectTaskByIdTest() throws Exception {
        Mockito.when(projectTaskRepository.findById(PROJECT_TASK_1.getId())).thenReturn(Optional.of(PROJECT_TASK_1));

        mockMvc.perform(
                MockMvcRequestBuilders
                        .delete("/api/v1/board/" + PROJECT_TASK_1.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void deleteProjectTaskByIdNotFoundTest() throws Exception {
        Mockito.when(projectTaskRepository.findById(PROJECT_TASK_1.getId())).thenReturn(null);

        mockMvc.perform(
                MockMvcRequestBuilders
                        .delete("/api/v1/board/" + PROJECT_TASK_1.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }
}
