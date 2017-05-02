import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from './components/Header';
// import { ... } from '../selectors';
// import { ...} from '../actions';


class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    const props = this.props;
    return (
      <div>
        <Header/>
        <div>{props.children}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // something: state.something
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // func(args){ dispatch(myaction(args)); } 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
