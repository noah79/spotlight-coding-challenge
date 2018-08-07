import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import './app.css';
import '@blueprintjs/core/lib/css/blueprint.css';

import createStore from '../../app/store/configureStore'

chrome.storage.local.get('swagger', ({ swagger }) => {
  const initialState = {
    swagger,
  };

  ReactDOM.render(<Root store={createStore(initialState)} />, document.querySelector('#root'));
});

