import React, {Component} from 'react';
import Linkify from 'react-linkify';
import {Redirect} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import {PostData} from '../../services/PostData';


class Editform extends Component {

constructor(props){
super(props);


this.state = { 
    sname:'~',
    semail:'~',
    spass:'~',
    gotohome: false,
    type: 'password'
};

this.onTodoChangesitename = this.onTodoChangesitename.bind(this);
this.onTodoChangeemail = this.onTodoChangeemail.bind(this);
this.onTodoChangepass = this.onTodoChangepass.bind(this);
this.saveupdates = this.saveupdates.bind(this);
this.updatedata = this.updatedata.bind(this);
}


handleClick = () => this.setState(({type}) => ({
    type: type === 'text' ? 'password' : 'text'
  }))


saveupdates() {
    
    let useremail=document.getElementById('email').value;
    let usepassword=document.getElementById('password').value;
    let usersite=document.getElementById('sitename').value;
    let userid=document.getElementById('uid').value;
  
   
    // alert(useremail+usepassword+usersite);
    let postupData = {user_id: userid,user_email:useremail,user_site:usersite,use_password:usepassword};
    if(useremail!='~' || usepassword!='~' || usersite!='~'){

        // var s="*".repeat(2)
        // alert(s);
        
        confirmAlert({
            title: 'Update',
            message: 'Are you Sure?',
            buttons: [
            {
            label: 'Yes',
            onClick: () => this.updatedata(postupData)
           
            },
            {
            label: 'NO',
            onClick: () => alert('ckick ok!')
            
            }
            ]
            });


  
}
    else{
      alert();
        

    }
    }


    updatedata(postupData)
    {
        // alert("a");
        PostData('updateuser',postupData).then((result) => {
    let responseJson = result;
    // console.log("data comes");
    if(responseJson.status){
        alert("Update Data Successfuly")
   
    this.setState({gotohome: true});
    }
    else
    {
       
    alert(result.error);
    }
    });
        
    }




onTodoChangesitename(value){
    this.setState({
         sname: value
    });
    // alert(this.state.nameq);
}

onTodoChangeemail(value){
    this.setState({
         semail: value
    });
    // alert(this.state.nameq);
}
onTodoChangepass(value){
    this.setState({
         spass: value
    });
    // alert(this.state.nameq);
}

render() {
    if(this.state.gotohome){
        return (<Redirect to={'/home'}/>)
        }
let userFeed = this.props.passData
.map(function (passData, index) {
return (

    

    <div className="row " id="sBody" key={index}>
    <div className="medium-5 columns left">
        <br></br><br></br>
    <h4>Edit- User Information</h4>
    <br></br><br></br>
    <input type="text" value={ this.state.sname!='~' ? this.state.sname:passData.sitename } placeholder="enter new site name" id="sitename"   name="sitename" placeholder="sitename" onChange={e => this.onTodoChangesitename(e.target.value)}/>
    <input type="text"  value={ this.state.semail!='~' ? this.state.semail:passData.emailid } placeholder="enter new emailid" id="email" ref="email"  name="email" onChange={e => this.onTodoChangeemail(e.target.value)}  />
    
    <tr>
        <td>
    <input type={this.state.type} value={ this.state.spass!='~' ? this.state.spass:passData.password } name="password" id="password" onChange={e => this.onTodoChangepass(e.target.value)}  placeholder="enter new Password" />
    </td>
    <td>
<button     onClick={this.handleClick}>{this.state.type === 'text' ? 'Hide' : 'Show'}</button>
</td>
    </tr>
    <input type="hidden" id="uid" value={passData.userid}/>
    <input type="submit" className="button" value="Update" onClick={this.saveupdates}/>
    <a href="/home">Go to Home</a>
    <br></br><br></br><br></br>
    </div>
    </div>






)
}, this);

return (
<div>
{userFeed}

</div>
);
}

}

export default Editform;