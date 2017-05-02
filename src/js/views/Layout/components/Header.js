import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    const props = this.props;
    return (
      <div className="header">
        <h1>And away we go!</h1>
      </div>
    );
  }
}






