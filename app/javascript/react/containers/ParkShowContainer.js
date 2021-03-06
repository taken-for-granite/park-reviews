import React, { Component } from 'react'

class ParkShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      park: {
        Name: '',
        Address: '',
        City: '',
        State: '',
        Zip: '',
        Description: ''
      }
    }

  }



  componentDidMount() {
    fetch(`/api/v1/parks/${this.props.params.id}`)
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
        park: response.park
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return(
      <div className='park-show-tile'>
        <div>
          <h2 className="park-title">{this.state.park.name}</h2>
          {this.state.park.address}<br />
          {this.state.park.city}, {this.state.park.state}, {this.state.park.zip} <br />
          Description: {this.state.park.description}<br />
        </div>
        <div>
          <a href={`/parks/${this.props.params.id}/reviews/new`}>Add a review!</a>
        </div>
      </div>
    )
  }
}

export default ParkShowContainer
