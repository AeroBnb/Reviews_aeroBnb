import React from 'react';
import axios from 'axios';

import Search from './components/Search.jsx';
import Stars from './components/Stars.jsx';
import ReviewList from './components/ReviewList.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.reviews || [],
      search: [],
      ratings: this.props.ratings || [],
      showSearch: false
    }
  }

  render() {
    return (
      <div>
        <Search searchReviews={this.searchReviews} ratings={this.state.ratings} reviews={this.state.reviews}/>
        <Stars ratings={this.state.ratings}/>
        <ReviewList reviews={this.state.showSearch ? this.state.search : this.state.reviews}/>
      </div>
    )
  }
}

export default Reviews;