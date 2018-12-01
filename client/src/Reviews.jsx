import React from 'react';
import axios from 'axios';

import Search from './components/Search.jsx';
import Stars from './components/Stars.jsx';
import ReviewList from './components/ReviewList.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    // console.log('browser props', this.props);
    this.state = {
      reviews: this.props.reviews || [],
      search: [],
      ratings: this.props.ratings || [],
      showSearch: false,
      // totalRatings: this.props.totalRatings || 0,
      // ratingsLoaded: this.props.ratingsLoaded || false
    }
    this.searchReviews = this.searchReviews.bind(this);
  }

  searchReviews(query) {
    let queryString = window.location.search;
    let listingID = (queryString.slice(-3) * 1);
    let params = {
      params: {
        id: listingID,
        query: `%${query}%`
      }
    };

    axios.get('/search', params)
      .then((result) => {
        this.setState({
          search: result.data,
          showSearch: true
        });
      })
      .catch((error) => {
        console.error(error);
      })
  }



  render() {
    return (
      <div>
        <Search searchReviews={this.searchReviews} ratings={this.state.ratings} reviews={this.state.reviews} totalRatings={this.props.totalRatings} ratingsLoaded={this.props.ratingsLoaded} starsLoaded={this.props.starsLoaded} avgRating={this.props.avgRating}/>
        <Stars ratings={this.state.ratings}/>
        <ReviewList reviews={this.state.showSearch ? this.state.search : this.state.reviews}/>
      </div>
    )
  }
}

export default Reviews;