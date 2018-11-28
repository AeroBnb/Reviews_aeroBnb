import React from 'react';
import axios from 'axios';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: props.reviews || [],
      search: [],
      ratings: props.ratings || [],
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