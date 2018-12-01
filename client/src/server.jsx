import React from 'react';
import Reviews from './Reviews.jsx'

class App extends React.Component {
  constructor(props) {
    // console.log('browser props', props);
    super(props);
  }

  render () {
    return (
      <React.Fragment>
        <Reviews reviews={this.props.reviews} ratings={this.props.ratings} ratingsLoaded={this.props.ratingsLoaded} totalRatings={this.props.totalRatings} starsLoaded={this.props.starsLoaded} avgRating={this.props.avgRating}/>
      </React.Fragment>
    )
  }
}

export default App;