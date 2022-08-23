import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        city: '',
        error: false,
        errorMessage: '',
        lon: '',
        lat: ''
      }

  }
  
  handleInput = e => {
    e.preventDefault();
    this.setState({
      city: e.target.value
    })
  }

  getCityData = async (e) => {
    e.preventDefault();
    try{
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      let cityData = await axios.get(url);
      this.setState({
        city: cityData.data[0].display_name,
        lon: cityData.data[0].lon,
        lat: cityData.data[0].lat
      })
      console.log(cityData.data[0]);
    } catch(error){
        this.setState({
          error:true,
          errorMessage: error.message
        })
      }
    }

  render () {
  //   {
  //   this.state.error
  //   ?
  //   <p>{this.state.errorMessage}</p>
  //   :
  //   <ul>{cityData.data[0].lat}</ul>

  // }
    //proof of it in state
    console.log('app state: ', this.state);
    

    return (
      <div>
        <form onSubmit={this.getCityData}>
          <label>Pick a City
            <input type='text' onInput={this.handleInput} />
          </label>
          <button type="submit">Explore</button>
        </form>
        <Card style={{ width: '18rem' }}>
          <ListGroup variant="flush">
            <ListGroup.Item>{this.state.city}</ListGroup.Item>
            <ListGroup.Item>{this.state.lat}</ListGroup.Item>
            <ListGroup.Item>{this.state.lon}</ListGroup.Item>
          </ListGroup>
        </Card>
      </div> 
    );
  }
}

export default App;
