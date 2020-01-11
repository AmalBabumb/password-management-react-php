import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';

class Login extends Component {
constructor(){
super();
this.state = {
emailid: '',
password: '',
redirectToReferrer: false,
type: 'password'

};
this.login = this.login.bind(this);
this.onChange = this.onChange.bind(this);
}

handleClick = () => this.setState(({type}) => ({
    type: type === 'text' ? 'password' : 'text'
  }))

login() {
if(this.state.emailid && this.state.password){
PostData('login',this.state).then((result) => {
  
let responseJson = result;
if(responseJson.userData){
  // alert(JSON.stringify(responseJson));
sessionStorage.setItem('userData',JSON.stringify(responseJson));
this.setState({redirectToReferrer: true});
}
else
alert(result.error);
});
}
else{
  alert("Enter Valid Data!");
}
}
onChange(e){
this.setState({[e.target.name]:e.target.value});
}
render() {
if (this.state.redirectToReferrer) {
return (<Redirect to={'/home'}/>)
}
if(sessionStorage.getItem('userData')){
return (<Redirect to={'/home'}/>)
}
return (
<div className="row" id="Body">
<div className="medium-6 columns left">
<h4>Login</h4>
<input type="email" name="emailid" placeholder="Enter Registered Emailid" onChange={this.onChange}/>

<tr>
    <td>
<input value={this.state.value} type={this.state.type} name="password" placeholder="Enter Password" onChange={this.onChange}/> 
</td>
<td>
<button     onClick={this.handleClick}>{this.state.type === 'text' ? 'Hide' : 'Show'}</button>
</td>
</tr>


<input type="submit" className="button" value="Login" onClick={this.login}/>


</div>
</div>
);
}
}
export default Login;