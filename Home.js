
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';
import {PostData} from '../../services/PostData';
import UserFeed from "../UserFeed/UserFeed";
import { confirmAlert } from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';

class Home extends Component {

constructor(props) {
super(props);

this.state = {
data:[],
// userFeed: '',
redirectToReferrer: false,

// name:'',
userid:'',
emailid:'',
usermail:'',
sitename:'',
ulmode: true
};

this.getUserFeed = this.getUserFeed.bind(this);
// this.feedUpdate = this.feedUpdate.bind(this);
// this.onChange = this.onChange.bind(this);
this.deleteFeed = this.deleteFeed.bind(this);
this.deleteFeedAction = this.deleteFeedAction.bind(this);
this.logout = this.logout.bind(this);
this.updmode = this.updmode.bind(this);
}

componentWillMount() {

if(sessionStorage.getItem("userData")){

    let data = JSON.parse(sessionStorage.getItem("userData"));
   
    this.setState({usermail:data.userData.emailid});

this.getUserFeed();
}

else{
this.setState({redirectToReferrer: true});
}

}

// feedUpdate(e) {

// e.preventDefault();
// let data = JSON.parse(sessionStorage.getItem("userData"));
// let postData = { user_id: data.userData.user_id, feed: this.state.userFeed };
// if (this.state.userFeed) {
// PostData('feedUpdate', postData).then((result) => {
// let responseJson = result;
// this.setState({data: responseJson.feedData});
// });
// }
// }

deleteFeed(e){
    let updateIndex=e.target.getAttribute('value');
    let feed_id=e.target.getAttribute('data');
    //   alert(updateIndex);
confirmAlert({
title: 'Delete Feed',
message: 'Are you sure to delete this feed.',
buttons: [
{
label: 'Yes',
onClick: () => this.deleteFeedAction(updateIndex,feed_id)
},
{
label: 'No',
onClick: () => alert('Click No')
}
]
});

}

deleteFeedAction(updateIndex,feed_id){

 
let postData = {user_id: feed_id};
if (postData) {

PostData('deleteuser', postData).then((result) => {
 this.state.data.splice(updateIndex,1);
 this.setState({data:this.state.data});

if(result.success){

alert(result.success);


}
else
alert(result.error);

});
}
}



getUserFeed() {

let data = JSON.parse(sessionStorage.getItem("userData"));
// alert(data);
this.setState({emailid:data.userData.emailid});
// alert(this.state.emailid);
this.setState({userid:data.userData.userid});
this.setState({sitename:data.userData.sitename});

let postData = { user_id: data.userData.userid};

if (data) {
PostData('select', postData).then((result) => {
let responseJson = result;

if(responseJson.feedData){
this.setState({data: responseJson.feedData});
// console.log(this.state);
}
});
}

}

updmode()
{
    
    this.setState({ulmode:!this.state.ulmode});
    // alert(this.state.ulmode);
}


logout(){
sessionStorage.setItem("userData",'');
sessionStorage.clear();
this.setState({redirectToReferrer: true});
}

render() {
if (this.state.redirectToReferrer) {
return (<Redirect to={'/login'}/>)
}


return (
<div className="row" id="Body">
<div className="medium-12 columns">
<marquee><p>Welcome&nbsp;&nbsp;{this.state.usermail}</p></marquee>    
    <br></br>
<a href="/" className="button">DashBoard</a>
<a href="#" onClick={this.logout} className="logout">Logout</a>
<a href="/adduser" className="button">Add New User</a>
<button  className="button small btn-color" onClick={this.updmode}  >
<i className="fa fa-user-times" aria-hidden="true"></i>
{this.state.ulmode?'Show Passwords':'Hide All Passwords'}
</button>
<br></br>
<br></br>
</div>
<UserFeed passData = {this.state.data} deleteFeed = {this.deleteFeed} seemode={this.state.ulmode}/>

</div>
);
}
}

export default Home;