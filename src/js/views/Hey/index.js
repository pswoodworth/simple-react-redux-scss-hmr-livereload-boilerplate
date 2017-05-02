import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


class Login extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    const props = this.props;
    return (
      <h1 className="hey">Hey!</h1>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => ({
    // func(args){ dispatch(myaction(args)); } 
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

