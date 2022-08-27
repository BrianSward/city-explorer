import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Weather from './components/Weather.js';
import Movies from './components/Movies.js';

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        city_name: '',
        error: false,
        errorMessage: '',
        cityMap: '',
        lon: '',
        lat: '',
        cityData: {},
        movieData: {},
     
      }

  }
  
  handleInput = e => {
    e.preventDefault();
    this.setState({
      city_name: e.target.value
    })
  }
  
  getCityData = async (e) => {
    e.preventDefault();
    try{
      let url1 = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city_name}&format=json`
      let cityData1 = await axios.get(url1);
      let url2 = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityData1.data[0].lat},${cityData1.data[0].lon}&zoom=12&size=500x500&format=jpeg`
      this.setState({
        city: cityData1.data[0].display_name,
        lon: cityData1.data[0].lon,
        lat: cityData1.data[0].lat,
        mapState: url2      
      })
     
      const server = process.env.REACT_APP_SERVER;
      let url = `${server}/weather?lat=${cityData1.data[0].lat}&lon=${cityData1.data[0].lon}`;
      let cityData = await axios.get(url);
      this.setState({
        cityData: cityData,
      });
     
      let url3 = `${server}/movies?city=${this.state.city_name}`;
      let movieData = await axios.get(url3);
      this.setState({
        movieData: movieData,
      });
      

      
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
            <input type='text' onInput={this.handleInput} />
          </label>
          <button onClick={this.getCityData} type="submit" as="input" >Explore</button>
        </form>
    
        {
          this.state.error
          ?
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Error!!</Card.Title>
          
            </Card.Body>
         </Card>

          :

          !this.state.lat
          
          ?
          <div>Please Enter City</div>
          :
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" alt="map" src={this.state.mapState}/>
              <Card.Body>
                <Card.Title>{this.state.city}</Card.Title>
                <Card.Text>
                <>
                <Weather cityData={this.state.cityData}/>
                </>
                </Card.Text>
                
                <Card.Text>
                <>
                <Movies movieData={this.state.movieData}/> 
                </>
                {/* {
                this.state.movieData.data &&
                this.state.movieData.data.map ((v,i) => 
                  <Card.Text key={i}>{v.name} {v.overview}</Card.Text>
                )}
                 */}
                </Card.Text>
              </Card.Body>
          </Card>
        }
      </div> 
    );
  }
}

export default App;
