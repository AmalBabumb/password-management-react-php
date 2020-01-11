import React, {Component} from 'react';
import {PostData} from '../../services/PostData'
import {Redirect} from 'react-router-dom';
import Editform from "./Editform";
class Edit extends Component {
constructor(props){
super(props);
this.state = {
data2:[],

// name: '',
redirectToReferrer: false
};

}

componentWillMount() {
  if(!sessionStorage.getItem("userData")){
  
      this.setState({redirectToReferrer: true});
  }
  }


componentDidMount() {
  
    const { id } = this.props.match.params;
    
    let praid=this.props.match.params.id;
    
    
      let postData = {user_id: praid};
      if (postData) {
        

      PostData('seleforupdt', postData).then((result) => {
        
         let responseJson = result;
        
         if(responseJson){


          this.setState({data2: responseJson.outData});
        
            
            }

       
       
       
       });
    }
//    alert(id);
  }

  

  render() {
    if (this.state.redirectToReferrer) {
    return (<Redirect to={'/home'}/>)
    }
    return (

<div>
<Editform passData = {this.state.data2}  />
</div>
    );

    }

}
export default Edit;