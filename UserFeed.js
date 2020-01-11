import React, {Component} from 'react';
import Linkify from 'react-linkify';
import './UserFeed.css';
import {Link} from 'react-router-dom';

class UserFeed extends Component {

constructor(props){
super(props);



}


render() {

let userFeed = this.props.passData
.map(function (passData, index) {
return (
<div className="medium-12 columns" key={index}>

<div className="people-you-might-know">

<div className="row add-people-section">
<div className="small-12 medium-10 columns about-people">

<div className="about-people-author">
    
<p className="author-name">
<b>Site Name: &nbsp;&nbsp;&nbsp;<Linkify>{passData.sitename}</Linkify></b>
<ul>email: &nbsp;&nbsp;&nbsp;{passData.emailid}</ul>


<ul>password:&nbsp;&nbsp;&nbsp;{this.props.seemode?"*".repeat(passData.password.length):passData.password}</ul>
<br/>

</p>

</div>
</div>
<div className="small-12 medium-2 columns add-friend">





<Link to={"/edit/"+passData.userid} className="button small btn-color"   >Edit</Link>


<div className="add-friend-action">
<button id="del" className="button small btn-color" onClick={this.props.deleteFeed} data={passData.userid} value={index} >
<i className="fa fa-user-times" aria-hidden="true"></i>
Delete
</button>
</div>
</div>
</div>
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

export default UserFeed;