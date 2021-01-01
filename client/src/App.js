import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import AuthForm from './Components/AuthForm/AuthForm';
import InstructorDashboard from './Components/InstructorDashboard/InstructorDashboard';
import './App.css';

// public route - only available to non-authenticated users
const PublicRoute = ({component : Component, ...rest}) => {
  return (
  <Route {...rest} render={
    function(props){
      let merged = {...props, ...rest};
      return ( localStorage.getItem('_auth') == null ? 
        <Component {...merged} /> : 
        <Redirect to={{pathname: '/dashboard', state: {from: props.location}}} />
      );
    }
  }/>);
};

// private route - only available to non-authenticated users
const PrivateRoute = ({component : Component, ...rest}) => {
  return (
  <Route {...rest} render={
    function(props){
      let merged = {...props, ...rest};
      return ( localStorage.getItem('_auth') != null ? 
        <Component {...merged} /> : 
        <Redirect to={{pathname: '/login', state: {from: props.location}}} />
      );
    }
  }/>);
};

function App() {
  return (
    <div id="baseDiv">
      <BrowserRouter>
        <Switch>
          <PublicRoute exact path="/" component={Homepage} />
          <PublicRoute exact path="/login" component={AuthForm} register={false}/>
          <PublicRoute exact path="/register" component={AuthForm} register={true}/>
          <PrivateRoute exact path="/dashboard" component={InstructorDashboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
