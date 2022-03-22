import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IProjectTask } from "../types/projectTask";
import {
  DELETE_PROJECT_TASK,
  GET_ERRORS,
  GET_PROJECT_TASKS,
  GET_PROJECT_TASK,
} from "./types";

interface INewProjectTask {
  summary: string;
  acceptanceCriteria: string;
  status: "TO_DO" | "IN_PROGRESS" | "DONE" | "";
}

export const addProjectTask =
  (projectTask: INewProjectTask, history: NavigateFunction) =>
  async (dispatch: ThunkDispatch<IProjectTask, void, Action>) => {
    try {
      await axios.post("http://localhost:8080/api/v1/board", projectTask);

      history("/");

      dispatch({ type: GET_ERRORS, payload: {} });
    } catch (error: any) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

export const getBacklog =
  () => async (dispatch: ThunkDispatch<IProjectTask, void, Action>) => {
    const res = await axios.get("http://localhost:8080/api/v1/board/all");

    dispatch({ type: GET_PROJECT_TASKS, payload: res.data });
  };

export const deleteProjectTask =
  (projectTaskId: string) =>
  async (dispatch: ThunkDispatch<IProjectTask, void, Action>) => {
    if (window.confirm("You are deleting task " + projectTaskId)) {
      await axios.delete(`http://localhost:8080/api/v1/board/${projectTaskId}`);
    }

    dispatch({ type: DELETE_PROJECT_TASK, payload: projectTaskId });
  };

export const getProjectTask =
  (projectTaskId: string, history: NavigateFunction) =>
  async (dispatch: ThunkDispatch<IProjectTask, void, Action>) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/board/${projectTaskId}`
      );

      dispatch({ type: GET_PROJECT_TASK, payload: res.data });

      dispatch({ type: GET_ERRORS, payload: {} });
    } catch (error) {
      history("/");
    }
  };
