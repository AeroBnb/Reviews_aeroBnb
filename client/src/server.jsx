import React from 'react';
import Reviews from './Reviews.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Reviews reviews={this.props.reviews} ratings={this.props.ratings} ratingsLoaded={this.props.ratingsLoaded} totalRatings={this.props.totalRatings} starsLoaded={this.props.starsLoaded} avgRating={this.props.avgRating}/>
      </div>
    )
  }
}

export default App;