import React from 'react';
import Reviews from './Reviews.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Reviews reviews={this.props.reviews}  ratings={this.props.ratings}/>
      </div>
    )
  }
}

export default App;