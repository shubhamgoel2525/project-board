import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import classnames from "classnames";

import {
  getProjectTask,
  addProjectTask,
} from "../../actions/projectTaskActions";

const UpdateProjectTask = () => {
  const params = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.errors);
  const projectTask = useSelector((state) => state.projectTask.projectTask);

  const [state, setState] = React.useState({
    id: "",
    summary: "",
    acceptanceCriteria: "",
    status: "",
  });
  const [errorsObject, setErrorsObject] = React.useState({});

  React.useEffect(() => {
    dispatch(getProjectTask(params.project_task_id));
  }, [params.project_task_id, dispatch]);

  React.useEffect(() => {
    setErrorsObject(errors);
  }, [errors]);

  React.useEffect(() => {
    // Check if project task fields are not undefined
    // TODO: Find a better solution
    if (!projectTask.id) {
      return;
    }

    const { id, summary, acceptanceCriteria, status } = projectTask;

    setState({ id, summary, acceptanceCriteria, status });
  }, [projectTask]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      id: state.id,
      summary: state.summary,
      acceptanceCriteria: state.acceptanceCriteria,
      status: state.status,
    };

    dispatch(addProjectTask(updatedTask, history));
  };

  return (
    <div className="addProjectTask">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/" className="btn btn-light">
              Back to Board
            </Link>

            <h4 className="display-4 text-center">Add /Update Project Task</h4>

            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control form-control-lg", {
                    "is-valid": errorsObject.summary,
                  })}
                  name="summary"
                  placeholder="Project Task summary"
                  value={state.summary}
                  onChange={onChange}
                />
                {errorsObject.summary && (
                  <div className="invalid-feedback">{errorsObject.summary}</div>
                )}
              </div>

              <div className="form-group">
                <textarea
                  className="form-control form-control-lg"
                  placeholder="Acceptance Criteria"
                  name="acceptanceCriteria"
                  value={state.acceptanceCriteria}
                  onChange={onChange}
                ></textarea>
              </div>

              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="status"
                  value={state.status}
                  onChange={onChange}
                >
                  <option value="">Select Status</option>
                  <option value="TO_DO">TO DO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>

              <input type="submit" className="btn btn-primary btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProjectTask;
