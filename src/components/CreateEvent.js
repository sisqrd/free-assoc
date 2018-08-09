import React from 'react';
import { Container,Button,Form, Input, Select,TextArea,Icon } from 'semantic-ui-react'
import {
    TimeInput,
    DatesRangeInput,
    DateTimeInput,
  } from 'semantic-ui-calendar-react';
import { WithContext as ReactTags } from 'react-tag-input';
import axios from 'axios';
import {EventHistory} from './EventHistory'
import cors from 'cors';
const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim({
  secure: true
})


//tags
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const options = [
  { key: 'art', text: 'Art', value: 'art' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'performance', text: 'Performance', value: 'performance' },
]


const delimiters = [KeyCodes.comma, KeyCodes.enter];


  export class CreateEvent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        selectedFile:null,
        eventName: '',
        venueName: '',
        medium:'',
        time: '',
        datesRange: '',
        streetAddress: '',
        city: '',
        state: '',
        country: '',
        medium: '',
        about: '',
        tags: [],
      suggestions: [
          { id: 'LGBT', text: 'LGBT' },
          { id: 'Alternative', text: 'Alternative' },
          { id: 'Free Event', text: 'Free Event' },
          { id: 'Experimental', text: 'Experimental' },
          { id: 'Metal', text: 'Metal' },
          { id: 'Explicit Content', text: 'Explicit Content' }
       ]
      };
    }

    handleDelete=(i)=> {
      const {tags} = this.state
      this.setState({
        tags: tags.filter((tag,index)=> index !==i)
      })
    }

    handleAddition=(tag)=>{
      this.setState(state=> ({tags:[...state.tags,tag]}))
    }



    handleDateChange = (event, {name, value}) => {
      if (this.state.hasOwnProperty(name)) {
        this.setState({ [name]: value });
      }
    }

    handleTimeChange = (event, {name, value}) => {
      if (this.state.hasOwnProperty(name)) {
        this.setState({ [name]: value });
      }
    }


    handleDrag=(tag, currPos, newPos)=>{
      const tags = [...this.state.tags];
      const newTags = tags.slice();

      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);

      // re-render
      this.setState({ tags: newTags });
  }


  onCreate = (e) => {
     let query = this.state.streetAddress + ', ' + this.state.city + ', ' + this.state.state + ', ' + this.state.country
    const createEvent = {
      eventName: this.state.eventName,
      venueName: this.state.venueName,
      medium: this.state.medium, 
      time: this.state.time,
      datesRange: this.state.datesRange,
      streetAddress: this.state.streetAddress,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      about: this.state.about,
      tags: this.state.tags 
  }
    const { description, selectedFile} = this.state;
    e.preventDefault();
    console.log(selectedFile)
    let formData = new FormData(); 
    formData.append('info', JSON.stringify(createEvent))
    formData.append('selectedFile', selectedFile);
    console.log(query)

    geocoder.search({q:query})
    .then((response)=> {
      
      formData.append('latitude', response[0].lat)
      formData.append('longitude', response[0].lon)

      return axios.post('http://localhost:1337/fileUpload', formData)
    }).then((result)=> {
      this.props.redirect('EventHistory')
    }).catch((err)=> {
      console.log(err)
    })

    }


    onEventNameChange = (event) => {
      this.setState({
        eventName: event.target.value
      })
    }

    onAddressChange = (event) => {
      this.setState({
        streetAddress: event.target.value
      })
    }

    onCityChange = (event) => {
      this.setState({
        city: event.target.value
      })
    }

    onStateChange = (event) => {
      this.setState({
        state: event.target.value
      })
    }

    onCountryChange = (event) => {
      this.setState({
        country: event.target.value
      })
    }

  onEventNameChange = (event) => {
    this.setState({
      eventName: event.target.value
    })
  }

  onAddressChange = (event) => {
    this.setState({
      streetAddress: event.target.value
    })
  }

  onCityChange = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  onStateChange = (event) => {
    this.setState({
      state: event.target.value
    })
  }

  onCountryChange = (event) => {
    this.setState({
      country: event.target.value
    })
  }

  onVenueNameChange = (event) => {
    this.setState({
      venueName: event.target.value
    })
  }

  onAboutChange = (event) => {
    this.setState({
      about: event.target.value
    })
  }

  onMediumChange = (event,{value}) => {
    this.setState({
        medium: value
    })
}

  fileSelectedHandler=(event)=>{
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

 

    render() {

      const {tags,suggestions} = this.state
      return (
        <Form>
          <Form.Group style={{display:'flex'}}>
          <Form.Field control={Input} label='Event Name' placeholder='Event Name' onChange={this.onEventNameChange} />
          <Form.Field control={Input} label='Venue Name' placeholder='Venue Name' onChange={this.onVenueNameChange}/>
        </Form.Group>
        <Form.Group inline>
           <label>Medium</label>
           <br /> 
          <Select label='Medium' style={{width:'100%'}} onChange = {this.onMediumChange} options={options} className = "field" />
        </Form.Group>
          From - To
          <DatesRangeInput
            inline
            name="datesRange"
            placeholder="Date Range"
            value={this.state.datesRange}
            iconPosition="left"
            onChange={this.handleDateChange} />
            <br />
          Event Time
          <TimeInput
          inline
          name="time"
          placeholder="Time"
          value={this.state.time}
          iconPosition="left"
          onChange={this.handleTimeChange} />
             <br />
            <Form.Field control={TextArea} label='About' placeholder='Tell us a little more about the event...' onChange={this.onAboutChange} />

          <br />

             <Form.Field control={Input} label='Street Address' placeholder='Street Address' onChange={this.onAddressChange} />
             <Form.Field control={Input} label='City' placeholder='City' onChange={this.onCityChange}/>
             <Form.Field control={Input} label='State' placeholder='State'  onChange={this.onStateChange}/>
             <Form.Field  control={Input} label='Country' placeholder='Country' onChange={this.onCountryChange}/>

             <div style={{position:'relative', width:'100%', background:'light-grey'}}>
                <ReactTags

                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    delimiters={delimiters} />
            </div> 
            <br /> 
            <div style={{display:'flex'}} > 
            <Input style={{marginRight:'auto', width:'70%'}} type='file' onChange={this.fileSelectedHandler} /> 
            </div> 
            <br />
            <Button style={{margin:'20px',marginLeft:'auto',marginRight:'auto', alignItems:'center'}} color = 'pink' className = "logout-button"  animated onClick = {this.onCreate}>
             <Button.Content visible>Create Event Go!</Button.Content>
                 <Button.Content hidden>
                     <Icon name='right arrow'   />
                 </Button.Content>
             </Button>
        </Form>
      );
    }

  }
