import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import Player from '../Player/Player';
import Map from '../Map/Map';
import { fetchData } from '../../actions/geodataActions';


class App extends React.Component {
  componentWillMount() {
    this.props.fetchData();
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
