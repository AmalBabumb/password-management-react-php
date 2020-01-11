import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Welcome from '././components/Welcome/Welcome';


import Login from '././components/Login/Login';
import Home from '././components/Home/Home';
import Adduser from '././components/Adduser/Adduser';
import Edit from '././components/Edit/Edit';
import NotFound from '././components/NotFound/NotFound';

const Routes = () => (
<BrowserRouter >
<Switch>
<Route exact path="/" component={Welcome}/>
<Route path="/login" component={Login}/>
<Route path="/home" component={Home}/>
<Route path="/adduser" component={Adduser}/>

<Route path="/edit/:id" component={Edit}/>
<Route path="*" component={NotFound}/>
</Switch>
</BrowserRouter>
);

export default Routes;