import React, {Component} from 'react';
import StarRating from 'react-native-star-rating';

export default class Rating extends Component {
  constructor(props) {
      super(props);
      this.state = {
        starCount: 3.5
      };
    }

  onStarRatingPress(rating) {
      this.setState({
        starCount: rating
      });
    }

  render() {
   return (
     <StarRating
      disabled={false}
      maxStars={5}
      starSize={20}
      rating={this.state.starCount}
      selectedStar={(rating) => this.onStarRatingPress(rating)}
      starColor={'orange'}

     />
   );
 }
}
