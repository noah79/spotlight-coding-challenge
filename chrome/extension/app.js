import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import './app.css';
import createStore from '../../app/store/configureStore'

chrome.storage.local.get('swagger', ({ swagger }) => {
  const initialState = {
    swagger,
  };

  console.log(createStore);
  ReactDOM.render(<Root store={createStore(initialState)} />, document.querySelector('#root'));
});

