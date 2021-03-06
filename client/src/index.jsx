import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Search from './components/Search.jsx';
import Stars from './components/Stars.jsx';
import ReviewList from './components/ReviewList.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.reviews || [],
      search: [],
      ratings: this.props.ratings || [],
      showSearch: false
    }
    this.getAllReviews = this.getAllReviews.bind(this);
    this.searchReviews = this.searchReviews.bind(this);
    this.getRatings = this.getRatings.bind(this);
  }

  // componentDidMount() {
  //   this.getAllReviews();
  //   this.getRatings();
  // }

  getAllReviews() {
    let queryString = window.location.search;
    let listingID = (queryString.slice(-3) * 1);
    let params = {
      params: {
        id: listingID
      }
    };

    axios.get('/reviews', params)
    .then((result) => {
      this.setState({
        reviews: result.data
      });
    }) 
    .catch((error) => {
      console.error(error);
    })
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

  getRatings() {
    let queryString = window.location.search;
    let listingID = (queryString.slice(-3) * 1);
    let params = {
      params: {
        id: listingID,
      }
    };
    
    axios.get('/ratings', params)
    .then((result) => {
      if (result.data[0].accuracy !== null) {
        this.setState({
          ratings: result.data
        });
      }
    }) 
    .catch((error) => {
      console.error(error);
    })
  }

  render() {
    return (
      <div>
        {/* <Search searchReviews={this.searchReviews} ratings={this.state.ratings} reviews={this.state.reviews}/> */}
        <Search searchReviews={this.searchReviews} ratings={this.state.ratings} reviews={this.state.reviews} totalRatings={this.props.totalRatings} ratingsLoaded={this.props.ratingsLoaded} starsLoaded={this.props.starsLoaded} avgRating={this.props.avgRating}/>
        <Stars ratings={this.state.ratings}/>
        <ReviewList reviews={this.state.showSearch ? this.state.search : this.state.reviews}/>
      </div>
    )
  }
};

window.Reviews = App;
//ReactDOM.render(<App />, document.getElementById("reviews"));