import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProjectTaskItem from "./ProjectTask/ProjectTaskItem";
import { getBacklog } from "../actions/projectTaskActions";

class ProjectBoard extends Component {
  componentDidMount() {
    this.props.getBacklog();
  }

  render() {
    const { projectTasks } = this.props.projectTask;
    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    const boardAlgorithm = (projectTasks) => {
      if (projectTasks.length < 1) {
        return (
          <div className="alert alert-info text-center" role="alert">
            No Project Tasks on this board
          </div>
        );
      } else {
        const tasks = projectTasks.map((projectTask) => (
          <ProjectTaskItem key={projectTask.id} projectTask={projectTask} />
        ));

        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].props.projectTask.status === "TO_DO") {
            todoItems.push(tasks[i]);
          }

          if (tasks[i].props.projectTask.status === "IN_PROGRESS") {
            inProgressItems.push(tasks[i]);
          }

          if (tasks[i].props.projectTask.status === "DONE") {
            doneItems.push(tasks[i]);
          }
        }

        return (
          <React.Fragment>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <div className="card text-center mb-2">
                    <div className="card-header bg-secondary text-white">
                      <h3>TO DO</h3>
                    </div>
                  </div>

                  {todoItems}
                </div>
                <div className="col-md-4">
                  <div className="card text-center mb-2">
                    <div className="card-header bg-primary text-white">
                      <h3>In Progress</h3>
                    </div>
                  </div>

                  {inProgressItems}
                </div>

                <div className="col-md-4">
                  <div className="card text-center mb-2">
                    <div className="card-header bg-success text-white">
                      <h3>Done</h3>
                    </div>
                  </div>
                </div>

                {doneItems}
              </div>
            </div>
          </React.Fragment>
        );
      }
    };

    return (
      <div className="container">
        <Link to="/add-project-task" className="btn btn-primary mb-3">
          <div className="d-flex align-items-center">
            <i className="fas fa-plus-circle"></i>
            <p className="mb-0 ms-1">Create Project Task</p>
          </div>
        </Link>
        <br />
        <hr />

        {boardAlgorithm(projectTasks)}
      </div>
    );
  }
}

ProjectBoard.propTypes = {
  getBacklog: PropTypes.func.isRequired,
  projectTask: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { projectTask: state.projectTask };
};

export default connect(mapStateToProps, { getBacklog })(ProjectBoard);
