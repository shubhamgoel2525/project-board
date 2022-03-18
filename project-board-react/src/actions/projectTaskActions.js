import axios from "axios";
import {
  DELETE_PROJECT_TASK,
  GET_ERRORS,
  GET_PROJECT_TASKS,
  GET_PROJECT_TASK,
} from "./types";

export const addProjectTask = (projectTask, history) => async (dispatch) => {
  try {
    await axios.post("http://localhost:8080/api/v1/board", projectTask);

    history.push("/");

    dispatch({ type: GET_ERRORS, payload: {} });
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const getBacklog = () => async (dispatch) => {
  const res = await axios.get("http://localhost:8080/api/v1/board/all");

  dispatch({ type: GET_PROJECT_TASKS, payload: res.data });
};

export const deleteProjectTask = (projectTaskId) => async (dispatch) => {
  if (window.confirm("You are deleting task " + projectTaskId)) {
    await axios.delete(`http://localhost:8080/api/v1/board/${projectTaskId}`);
  }

  dispatch({ type: DELETE_PROJECT_TASK, payload: projectTaskId });
};

export const getProjectTask = (projectTaskId, history) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/v1/board/${projectTaskId}`
    );

    dispatch({ type: GET_PROJECT_TASK, payload: res.data });
  } catch (error) {
    history.push("/");
  }
};
