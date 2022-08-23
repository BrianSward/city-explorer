import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        city: '',
        error: false,
        errorMessage: '',
        cityMap: '',
        lon: '',
        lat: '',
        location: {}
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
      let url2 = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=12&size=500x500&format=jpeg`
      this.setState({
        city: cityData.data[0].display_name,
        lon: cityData.data[0].lon,
        lat: cityData.data[0].lat,
        mapState: url2      
      })
    } 
    catch(error){
      this.setState({
        error:true,
        errorMessage: error.message
      })
    }  
    }
  
  render () {
    return (
      <div>
        <form>
          <label>Pick a City
            <input type='text' onChange={this.handleInput} />
          </label>
          <button onClick={this.getCityData} type="submit" as="input" >Explore</button>
        </form>
        {
          this.state.error
          ?
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Error!!</Card.Title>
              <Card.Text>
                <p>{this.state.errorMessage}</p>
              </Card.Text>
            </Card.Body>
        </Card>
          :

          !this.state.lat
          
          ?
          <p>Please Enter City</p>
          :
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" alt="map" src={this.state.mapState}/>
              <Card.Body>
                <Card.Title>{this.state.city}</Card.Title>
                <Card.Text>
                  lat: {this.state.lat}
                  {this.state.cityMap}
                </Card.Text>
                <Card.Text>
                  long: {this.state.lon}
                </Card.Text>
              </Card.Body>
          </Card>
        }
      </div> 
    );
  }
}

export default App;
