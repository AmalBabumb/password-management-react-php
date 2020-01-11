import React, {Component} from 'react';
import {PostData} from '../../services/PostData'
import {Redirect} from 'react-router-dom';
class Adduser extends Component {
constructor(props){
super(props);
this.state = {
sitename: '',
password: '',
email: '',
type: 'password',
// name: '',
redirectToReferrer: false
};
this.addnewuser = this.addnewuser.bind(this);
this.onChange = this.onChange.bind(this);
}

componentWillMount() {
if(!sessionStorage.getItem("userData")){

    this.setState({redirectToReferrer: true});
}
}

addnewuser() {
if(this.state.sitename && this.state.password && this.state.email){
    // alert("hereok");
PostData('addnewuser',this.state).then((result) => {
let responseJson = result;

if(responseJson.status){
    alert("Add new user succesfuly")

this.setState({redirectToReferrer: true});
}
else
{
    console.log("datanot comes");
alert(result.error);
}
});
}
else{
    alert("fields cannot empty");
}
}
onChange(e){
this.setState({[e.target.name]:e.target.value});
}

handleClick = () => this.setState(({type}) => ({
    type: type === 'text' ? 'password' : 'text'
  }))


render() {
if (this.state.redirectToReferrer) {
return (<Redirect to={'/home'}/>)
}
return (
<div className="row " id="sBody">
<div className="medium-5 columns left">
    <br></br><br></br>
<h4>Add New User</h4>
<br></br><br></br>
<input type="text" name="sitename" placeholder="sitename" onChange={this.onChange}/>
<input type="text" name="email" placeholder="Email" onChange={this.onChange}/>

<tr>
    <td>
<input type={this.state.type} name="password" placeholder="Password" onChange={this.onChange}/>
</td>
<td>
<button     onClick={this.handleClick}>{this.state.type === 'text' ? 'Hide' : 'Show'}</button>
</td>
</tr>
<input type="submit" className="button" value="Add New User" onClick={this.addnewuser}/>
<br></br><br></br><br></br>
</div>
</div>
);
}
}
export default Adduser;