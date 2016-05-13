import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/footer';
import LandingPage from './components/landing/landingPage';
import Dashboard from './components/dashboard/dashboard';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Profile from './components/profile/Profile';

class App extends Component {
  constructor(props) {
    super(props);
    // set default state
    this.state = {
      loggedIn: false,
      page: 'dashboard',
      // page: 'profile', // testing profile page
      user: null,
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(user) {
    console.log(user);
    this.setState({
      loggedIn: true,
      user,
    });
  }

  logout() {
    this.setState({
      loggedIn: false,
    });
  }

  render() {
    let pageLayout;
    if (this.state.loggedIn === false) {
      pageLayout = <div>
        <LandingPage login={this.login} />
      </div>
    }
    if (this.state.page === 'dashboard' && this.state.loggedIn === true) {
      pageLayout = <div>
        <Dashboard 
          handleSearchChange={this.handleSearchChange}
          handleSearchButtonClick={this.handleSearchButtonClick}
          user={this.state.user}
        />
      </div>
    }
    if (this.state.page === 'profile' && this.state.loggedIn === true) {
      pageLayout = <div>
        <Profile user={this.state.user} />
      </div>
    }
    return (
      <div>
        <Header logout={this.logout} />
        {pageLayout}
        <Footer />
      </div>
    );
  }
}

injectTapEventPlugin();

export default App;

