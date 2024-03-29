import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteProjectTask } from "../../actions/projectTaskActions";
import { IProjectTask } from '../../types/projectTask';
import { AppDispatch } from "../../store";

interface IProjectTaskItem {
  projectTask: IProjectTask;
}

const ProjectTaskItem = ({ projectTask }: IProjectTaskItem) => {
  const dispatch = useDispatch<AppDispatch>();

  const onDeleteClick = (projectTaskId: string) => {
    dispatch(deleteProjectTask(projectTaskId));
  };

  return (
    <div className="card mb-1 bg-light">
      <div className="card-header text-primary">ID: {projectTask.id}</div>

      <div className="card-body bg-light">
        <h5 className="card-title">{projectTask.summary}</h5>

        <p className="card-text text-truncate ">
          {projectTask.acceptanceCriteria}
        </p>

        <Link
          to={`/update-project-task/${projectTask.id}`}
          className="btn btn-primary"
        >
          View / Update
        </Link>

        <button
          className="btn btn-danger ml-4"
          onClick={() => onDeleteClick(projectTask.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectTaskItem;
