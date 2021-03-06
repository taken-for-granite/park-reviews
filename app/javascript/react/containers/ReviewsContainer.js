import React, { Component } from 'react'
import ReviewTile from '../components/ReviewTile'
import { browserHistory } from 'react-router'

class ReviewsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      errors: []
    }
    this.handleDeleteReview = this.handleDeleteReview.bind(this)
  }
  handleDeleteReview(reviewId) {
    fetch(`/api/v1/reviews/${reviewId}`, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json'}
     })
     .then(response => response.json())
     .then( response => {
       this.setState({
         errors: response.errors,
         reviews: response.reviews
       })
     })
   }
  componentDidMount() {
    fetch(`/api/v1/parks/${this.props.park_id}/reviews`,
      {
        credentials: 'same-origin'
      }
    )
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        reviews: response.formatted_reviews,
        current_user: response.formatted_user,

      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  render() {
    let current_user = this.state.current_user
    let reviews = this.state.reviews.map((review) => {
      let handleDelete = () => {
        this.handleDeleteReview(review.review_data.id)
      }
      var date = new Date(review.review_data.created_at).toDateString();

      return(
        <ReviewTile
          key={review.review_data.id}
          id={review.review_data.id}
          user={review.user_data}
          rating={review.review_data.rating}
          body={review.review_data.body}
          created_at={date}
          upvote_total={review.upvote_total}
          downvote_total={review.downvote_total}
          handleDelete={handleDelete}
          current_user={current_user}
          user_id={review.review_data.user_id}
        />
      )
    })

    return(
      <div>
        {reviews}
      </div>
    )
  }
}

export default ReviewsContainer
