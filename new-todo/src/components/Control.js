import React, { Component, Fragment } from 'react';
import Search from './Search'
import Sort from './Sort'
class Control extends Component {
  render() {
    return (
        <Fragment>
            {/* Search */}
            <Search />
            {/* Sort */}
            <Sort />
        </Fragment>
    );
  }
}

export default Control;
