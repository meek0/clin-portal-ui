import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import IGVModalWrapper from '../index';

describe('IGVModalWrapper', () => {
  test('should be as the snapshot', () => {
    const initialState = {};
    const store = configureStore()(initialState);
    const component = renderer.create(
      <Provider store={store}>
        <Router>
          <IGVModalWrapper />
        </Router>
      </Provider>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
