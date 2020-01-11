import React, {Component} from 'react';

import './Welcome.css';
class Welcome extends Component {

    constructor(){
        super();
        this.state = {
       
        redirectToReferrer: false,
        
        
        };
        this.logout = this.logout.bind(this);
        }

        componentWillMount() {
            if(!sessionStorage.getItem("userData")){
            
                 this.setState({redirectToReferrer: true});
            }
            }
            logout(){
                sessionStorage.setItem("userData",'');
                sessionStorage.clear();
                this.setState({redirectToReferrer: true});
                }   

render() {
    if (this.state.redirectToReferrer) {
        return (
            <div className="row " id="Body">
            <div className="medium-12 columns">
            <br></br>
            <br></br>
            <center>
            <a href="/login" className="button">Login</a>
           <br></br><br></br></center>
           <ul>
  <li>Front end in  react js</li>
  <li>Back end in php</li>
  <li>DataBase:Mysql</li>
</ul> 
            </div>
            </div>
            );
    }else{
        return (
            <div className="row " id="Body">
            <div className="medium-12 columns">
            <br></br>
            <br></br>
            <center>
            <a href="#" onClick={this.logout} className="button">Logout...</a>
            </center>
            <ul>
  <li>Front end in  react js</li>
  <li>Back end in php</li>
  <li>DataBase:Mysql</li>
</ul> 
            </div>
            </div>
            );
    }

}
}
export default Welcome;