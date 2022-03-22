import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";

import { addProjectTask } from "../../actions/projectTaskActions";
import { AppDispatch, RootState } from "../../store";

interface IState {
  summary: string;
  acceptanceCriteria: string;
  status: "TO_DO" | "IN_PROGRESS" | "DONE" | "";
}

interface IErrorObject {
  summary: string;
}

const AddProjectTask = () => {
  const history = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const errors = useSelector((state: RootState) => state.errors);

  const [state, setState] = React.useState<IState>({
    summary: "",
    acceptanceCriteria: "",
    status: "",
  });
  const [errorsObject, setErrorsObject] = React.useState<IErrorObject>({
    summary: "",
  });

  React.useEffect(() => {
    setErrorsObject(errors);
  }, [errors]);

  const onChange = (e: any) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    const newProjectTask = {
      summary: state.summary,
      acceptanceCriteria: state.acceptanceCriteria,
      status: state.status,
    };

    dispatch(addProjectTask(newProjectTask, history));
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
                    "is-invalid": errorsObject.summary,
                  })}
                  name="summary"
                  value={state.summary}
                  placeholder="Project Task summary"
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
                  onChange={onChange}
                  value={state.status}
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

export default AddProjectTask;
