import React from 'react';
import Reviews from './Reviews'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.reviews,
      ratings: this.props.ratings
    }
  }

  render () {
    return (
      <div>
        <Reviews reviews={this.state.reviews}  ratings={this.props.ratings}/>
      </div>
    )
  }
}

export default App;