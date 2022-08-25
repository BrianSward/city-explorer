import React from 'react';

import Card from 'react-bootstrap/Card';

class Movies extends React.Component {
  render(){
    return(
      <Card>
        {this.props.movieData.data && this.props.movieData.data.map ((v,i) => <Card.Text key={i}>{v.name} {v.overview}</Card.Text>
        )}
      </Card>
    );
  }
}

export default Movies
