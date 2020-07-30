import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home'

// Importing tasks
import Tasks from "./components/Task/Tasks";
import CreateTask from "./components/Task/CreateTask";
import TaskDetails from "./components/Task/TaskDetails";

const routing = () => (
    <div>
    <Switch>
        <Route exact path="/" component={Home} label="Home"/>
        <Route path="/tasks" component={Tasks} />
        <Route path="/task/new" component={CreateTask} />
        <Route path="/task/view" component={TaskDetails} />
    </Switch>
    </div>
)
export default routing;