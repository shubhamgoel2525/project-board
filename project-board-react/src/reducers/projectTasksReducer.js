import {
  DELETE_PROJECT_TASK,
  GET_PROJECT_TASK,
  GET_PROJECT_TASKS,
} from "../actions/types";

const initialState = { projectTasks: [], projectTask: {} };

function projectTaskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_TASKS:
      return { ...state, projectTasks: action.payload };

    case DELETE_PROJECT_TASK:
      return {
        ...state,
        projectTasks: state.projectTasks.filter(
          (projectTask) => projectTask.id !== action.payload
        ),
      };

    case GET_PROJECT_TASK:
      return { ...state, projectTask: action.payload };

    default:
      return state;
  }
}

export default projectTaskReducer;
