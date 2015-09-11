'use strict';

import Radium from 'radium';
import React from 'react';
import { Link, RouteHandler } from 'react-router';
import styles from '../styles';

class App extends React.Component {

  render() {
    console.log('render App');
    return (
    <div>

      <div styles={[ styles.flextainer ]}>
        <div styles={[ styles.flex1 ]}>
          <h1>App.jsx</h1>
        </div>
      </div>

      <RouteHandler/>
    </div>
    );
  }

}
export default Radium(App)