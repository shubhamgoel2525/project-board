import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "@fortawesome/fontawesome-free/css/brands.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

            <Routes>
              <Route path="/" element={<ProjectBoard />} />
              <Route path="/add-project-task" element={<AddProjectTask />} />
              <Route path="/update-project-task/:project_task_id" element={<UpdateProjectTask />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
