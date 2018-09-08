// External
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Internal
import Player from '../Player/Player';
import Map from '../Map/Map';
import { fetchData } from '../../actions/geodataActions';
import CONFIG from '../../config';
import './App.css';


// The main App
class App extends React.Component {
  componentWillMount() {
    // Load data from network
    this.props.fetchData();

    // Check for new data regularly
    setInterval(this.props.fetchData, CONFIG.GEODATA_FETCH_INTERVAL);
  }

  render() {
    return (
      <div className="App">
        <Player />
        <Map />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: bindActionCreators(fetchData, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
