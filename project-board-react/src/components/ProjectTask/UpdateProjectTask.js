import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";

import {
  getProjectTask,
  addProjectTask,
} from "../../actions/projectTaskActions";
import withRouter from "../../hoc/withRouter";

class UpdateProjectTask extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      summary: "",
      acceptanceCriteria: "",
      status: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { project_task_id } = this.props.params;

    this.props.getProjectTask(project_task_id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.errors !== prevProps.errors) {
      this.setState({ errors: this.props.errors });
    }

    const { id, summary, acceptanceCriteria, status } = this.props.projectTask;

    if (this.props !== prevProps) {
      this.setState({ id, summary, acceptanceCriteria, status });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updatedTask = {
      id: this.state.id,
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status,
    };

    this.props.addProjectTask(updatedTask, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="addProjectTask">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/" className="btn btn-light">
                Back to Board
              </Link>

              <h4 className="display-4 text-center">
                Add /Update Project Task
              </h4>

              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-valid": errors.summary,
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  ></textarea>
                </div>

                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProjectTask.propTypes = {
  projectTask: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getProjectTask: PropTypes.func.isRequired,
  addProjectTask: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { projectTask: state.projectTask.projectTask, errors: state.errors };
};

export default connect(mapStateToProps, { getProjectTask, addProjectTask })(
  withRouter(UpdateProjectTask)
);
