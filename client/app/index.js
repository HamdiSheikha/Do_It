import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import App from './components/App/App';
import NotFound from './components/App/NotFound';
import Welcome from './components/Welcome/Welcome';

import Home from './components/Home/Home';
import ToDoList from './components/ToDoList/ToDoList';
import NewItem from './components/ToDoList/NewItem';
import ListDefinition from './components/ListDefinition/ListDefinition';
import NewList from './components/ListDefinition/NewList';
import SignUp from './components/SignUp/SignUp';
import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>

        <Route exact path="/" component={Home}/>
        <Route path="/listdefinition" component={ListDefinition}/>
        <Route path="/welcome" component={Welcome}/>
        <Route path="/newList" component={NewList}/>

        <Route path="/newItem" component={NewItem}/>
        <Route path="/todolist" component={ToDoList}/>
        <Route path="/signup" component={SignUp}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
