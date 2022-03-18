import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/brands.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';

import "./App.css";
import store from './store';
import Navbar from "./components/Navbar";
import ProjectBoard from "./components/ProjectBoard";
import AddProjectTask from "./components/ProjectTask/AddProjectTask";
import UpdateProjectTask from "./components/ProjectTask/UpdateProjectTask";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />

            <Switch>
              <Route exact path="/">
                <ProjectBoard />
              </Route>
              <Route exact path="/add-project-task">
                <AddProjectTask />
              </Route>
              <Route exact path="/update-project-task/:project_task_id">
                <UpdateProjectTask />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
