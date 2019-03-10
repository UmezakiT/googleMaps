import React, { Component } from 'react';
import Globals from '../../utils/globals';
import superagent from 'superagent';
import DashboardView from './DashboardView';

class DashboardPage extends Component {

  state = {
    locations: [],
    user: []
  }
  
  componentDidMount() {
    let userID = localStorage.getItem("userID");
    let url = Globals.instance().baseUrl + '/locations/user/' + userID;
		superagent
        .get(url)
        .end((err, res) => {
          
          if(err){
            let message = JSON.parse(res.text);
            alert(message.message); 
            return;
          }

          this.setState({
            locations: res.body[1],
            user: res.body[0]
          });
          setTimeout(() => {
            Globals.hideLoadingIndicator();            
          }, 500);
        });
  }
  
  render() {
    return (
      <div>
          <DashboardView locations={this.state.locations} user={this.state.user} />
      </div>
    );
  }
}

export default DashboardPage;
