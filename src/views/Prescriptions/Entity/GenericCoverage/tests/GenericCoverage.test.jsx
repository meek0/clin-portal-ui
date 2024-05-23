import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { default as ApolloProvider } from 'providers/ApolloProvider';
import configureStore from 'redux-mock-store';

import GenericCoverage from '../index';

describe('Generic Coverage', () => {
  test('should be as the snapshot', () => {
    const initialState = {};
    const store = configureStore()(initialState);
    const component = renderer.create(
      <Provider store={store}>
        <ApolloProvider>
          <Router>
            <GenericCoverage />
          </Router>
        </ApolloProvider>
      </Provider>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
