import React, {Component} from 'react';
import {Button,Icon, Select,Input} from 'semantic-ui-react';

const options = [
    { key: 'art', text: 'Art', value: 'art' },
    { key: 'music', text: 'Music', value: 'music' },
    { key: 'theater', text: 'Theater', value: 'theater' },
  ]

class RegisterArtist extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username:'',
      password: '',
      passwordRepeat:'',
      email:'',
      medium: '',
      existingWork: [],
      bio: '',
      tag: [],
    }
  }

  onFirstnameChange = (event) =>{
    this.setState({
      firstName: event.target.value
    })
  }

  onLastnameChange = (event) =>{
    this.setState({
      lastName: event.target.value
    })
  }

  onUsernameChange = (event) =>{
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

  onMediumChange = (event) => {
      this.setState({
          medium: event.target.value
      })
  }

  onSampleChange = (event) => {
    this.setState({
        existingWork: event.target.value
    })
    }

  onBioChange = (event) => {
    this.setState({
        bio: event.target.value
    })
    }


  onRegister = () => {
    fetch('http://localhost:1337/register/artist', {
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
        this.props.redirect('Home')
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render(){
    return (
      <div>
        <Input style={{width:'190px', marginRight:'20px', marginBottom:'5px'}} onChange = {this.onFirstnameChange}  placeholder='First name' />
        <Input style={{width:'190px'}}  onChange = {this.onLastnameChange}  placeholder='Last name' />  
        <div> 
        <Input onChange = {this.onUsernameChange} className = "field" placeholder = "Username"/>
        <br /> 
        <Input onChange = {this.onEmailChange} className = "field" placeholder = "Email"/>
        <br /> 
        <Input onChange = {this.onPassChange} className = "field" placeholder = "Password"/>
        <br /> 
        <Input onChange = {this.onConfirmChange} className = "field" placeholder = "Confirm Password"/>
        <br /> 
        <Select style={{width:'400px'}} onChange = {this.onMediumChange} compact options={options} className = "field" placeholder = "Medium"/>
        <br /> 
        <Input onChange = {this.onSampleChange} className = "field" placeholder = "Sample Work Link"/>
        <br /> 
        
        <Input style={{height:'100px'}} onChange = {this.onBioChange} className = "field" placeholder = "Text us a little about yourself..."/>
        </div>
        <br /> 
        <Button color = 'green' className = "register-button"  animated onClick = {() => this.props.redirect('Register')}>
            <Button.Content visible>Register</Button.Content>
            <Button.Content hidden>
              <Icon name='right arrow' />
            </Button.Content>
          </Button>
      </div>

    );
  }
}
export default RegisterArtist;