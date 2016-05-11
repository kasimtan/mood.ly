import React, { PropTypes, Component } from 'react';
import Search from './Search';
import services from './services/services.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currQuote: '',
      currMood: '',
      currentGif: '',
      currentSearch: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  handleSearchButtonClick() {
    const self = this;
    const query = this.state.currentSearch;
    services.wikiCall(query, (res) => {
      const randomIndex = Math.floor((Math.random() * res.length) + 1);
      self.setState({
        currMood: query,
        currQuote: res[randomIndex],
      });
    });
    services.giphyCall(query, (res) => {
      const randomIndex = Math.floor((Math.random() * res.length) + 1);
      self.setState({
        currentGif: res[randomIndex],
      });
    });
  }

  handleSearchChange(event) {
    this.setState({
      currentSearch: event.target.value,
    });
  }

  render() {
    return (
      <div className="dashboard-content">
        <Search
          handleSearchChange={this.handleSearchChange}
          handleSearchButtonClick={this.handleSearchButtonClick}
        />
        <div className="moodly-content">
          <span className="quote-title"><h2>{this.state.currQuote}</h2></span>
        </div>
        <img src={this.state.currentGif} alt="" />
      </div>
    );
  }
}

// Dashboard.propTypes = {
//   handleSearchChange: PropTypes.func.isRequired,
//   handleSearchButtonClick: PropTypes.func.isRequired,
// };

export default Dashboard;