import React, { Component } from 'react';
import { Panel, Form, FormGroup } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Globals from '../../utils/globals'
import superagent from 'superagent';
import Snackbar from '@material-ui/core/Snackbar';


const divStyle = {
  display: 'flex',
  alignItems: 'center',
};

const margin_right = {
  marginRight : 20
};

const panelStyle = {
  backgroundColor: 'rgba(255,255,255,0.5)',
  border: 0,
  paddingLeft: 20,
  paddingRight: 20,
  marginTop: 50,
  width: 300,
  height : 250,
  textAlign: "center"  
};

const buttonStyle = {
  marginBottom: 0,
};

const cardStyle = {
  textAlign: 'center'
}

 class LoginForm extends Component {

  constructor() {
    super();
    this.state = { // state for component
      username: '',
      password: '',
      is_empty: false,
      fail: false,
      open: false
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClose() {
    this.setState({
      is_empty: false,
      fail: false,
      open: false
    })
  }

  handleFormSubmit = (e) => { // called when user click login button
    
    if (this.state.username.trim() === '' || this.state.password === '') {
			this.setState({is_empty:true});
      return;
		}
    console.warn(this.state);
    

    let url = Globals.instance().baseUrl + '/users/authenticate';
		superagent
        .post(url)
        .send(this.state)
        .end((err, res) => {
          
          if(err){
            this.setState({fail: true}) 
            return;
          }

          Globals.hideLoadingIndicator();
          localStorage.setItem("userID", res.body.userID);
          localStorage.setItem("token", res.body.token);
          localStorage.setItem("latitude", res.body.latitude);
          localStorage.setItem("longitude", res.body.longitude);
          
          this.setState({open: true});
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1000);

        });
    }


  handleInputChange = (e) => { // update state from input

    this.setState({
      is_empty:false
    })

		this.setState({
			[e.target.name]: e.target.value
		});
	}

  render() {
    return (
      <div style={divStyle}>
        <Card style={cardStyle}>
          <h1 style={{color: '#3f51b5'}}>LOG IN</h1>
          <Panel style={panelStyle}>
            <Form horizontal className="LoginForm" id="loginForm">
              <FormGroup controlId="formEmail">
                <TextField
                  id="outlined-uncontrolled"
                  label="Email Address"
                  onChange={this.handleInputChange}
                  value={this.state.username}
                  name="username"
                  margin="normal"
                  variant="outlined"
                />
                
              </FormGroup>
              <FormGroup controlId="formPassword">
                <TextField
                  id="outlined-uncontrolled"
                  label="Password"
                  onChange={this.handleInputChange}
                  value={this.state.password} 
                  name="password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                />
              
              </FormGroup>
              <br/>
              <FormGroup style={buttonStyle} controlId="formSubmit">
                <Button style={margin_right} variant='contained' color='primary'  onClick={this.handleFormSubmit}>
                  Login
                </Button>

                <Button variant='contained'  color='inherit' href="signup">
                  Signup
                </Button>


              </FormGroup>
            </Form>
          </Panel>
        </Card>

        <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            onClose={this.handleClose}
            open={this.state.open}
            autoHideDuration={6000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Login Successed!</span>}
          />

          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            onClose={this.handleClose}
            open={this.state.is_empty}
            autoHideDuration={6000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Please Insert Email and Password.</span>}
          />

          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            onClose={this.handleClose}
            open={this.state.fail}
            autoHideDuration={6000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Email or Password is Incorrect!</span>}
          />
      </div>
    )
  }
}

export default LoginForm;
