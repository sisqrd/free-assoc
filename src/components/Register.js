import React, {Component} from 'react';
import {Button, Icon, Input} from 'semantic-ui-react';

const url = 'https://6becdea7.ngrok.io'

class RegisterScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      password: '',
      email:'',
      passwordRepeat:''
    }
  }

  onNameChange = (event) =>{
    this.setState({
      name: event.target.value
    })
  }

  onEmailChange = (event) =>{
    this.setState({
      email: event.target.value
    })
  }

  onPassChange = (event) =>{
    this.setState({
      password: event.target.value
    })
  }

  onConfirmChange = (event) =>{
    this.setState({
      passwordRepeat: event.target.value
    })
  }

  onRegister = () => {
<<<<<<< HEAD
    fetch(url+ '/register/user', {
=======
    fetch(url + '/register/user', {
>>>>>>> 8ad9f3e60ac2bff82ff2cae0a28c8f3b50642bad
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.name,
        email: this.state.email,
        password: this.state.password,
        passwordRepeat: this.state.passwordRepeat
      })
    })
<<<<<<< HEAD
    .then((response) => response.text())
    .then((text) => {
      if(text === 'incomplete') {
        alert('Please fill in all fields.')
      } else if(text === 'passwords') {
        alert('Passwords must match.')
      } else if(text === 'exists') {
        alert('Account already exists. Please log in.')
        this.props.redirect('Home')
      } else {
=======
    .then((response) => {
      console.log(response);
      return response.json()
    })
    .then((responseJson) => {
      console.log(responseJson);
      if (responseJson.success) {
        return responseJson
>>>>>>> 8ad9f3e60ac2bff82ff2cae0a28c8f3b50642bad
        this.props.redirect('Login')
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render(){
    return (
      <div>
        <div>
        <Input onChange = {this.onNameChange} className = "field" placeholder = "Username"/>
        <br />
        <Input onChange = {this.onEmailChange} className = "field" placeholder = "Email"/>
        <br />
        <Input onChange = {this.onPassChange} className = "field" placeholder = "Password"/>
        <br />
        <Input onChange = {this.onConfirmChange} className = "field" placeholder = "Confirm Password"/>
        </div>
<<<<<<< HEAD
        <br /> 
        <Button color = 'green' className = "register-button"  animated onClick = {this.onRegister}>
=======
        <br />
        <Button color = 'green' className = "register-button"  animated onClick={this.onRegister}>
>>>>>>> 8ad9f3e60ac2bff82ff2cae0a28c8f3b50642bad
            <Button.Content visible>Register</Button.Content>
            <Button.Content hidden>
              <Icon name='right arrow' />
            </Button.Content>
          </Button>
      </div>

    );
  }
}
export default RegisterScreen;
