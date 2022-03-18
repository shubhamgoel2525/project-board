import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteProjectTask } from "../../actions/projectTaskActions";

class ProjectTaskItem extends React.Component {
  onDeleteClick(projectTaskId) {
    this.props.deleteProjectTask(projectTaskId);
  }

  render() {
    const { projectTask } = this.props;

    return (
      <div className="card mb-1 bg-light">
        <div className="card-header text-primary">ID: {projectTask.id}</div>

        <div className="card-body bg-light">
          <h5 className="card-title">{projectTask.summary}</h5>

          <p className="card-text text-truncate ">
            {projectTask.acceptanceCriteria}
          </p>

          <Link to={`/update-project-task/${projectTask.id}`} className="btn btn-primary">
            View / Update
          </Link>

          <button className="btn btn-danger ml-4" onClick={this.onDeleteClick.bind(this, projectTask.id)}>Delete</button>
        </div>
      </div>
    );
  }
}

ProjectTaskItem.propTypes = {
  deleteProjectTask: PropTypes.func.isRequired,
};

export default connect(null, { deleteProjectTask })(ProjectTaskItem);
