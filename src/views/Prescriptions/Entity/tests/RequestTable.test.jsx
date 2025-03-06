import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import RequestTable from '../RequestTable';

describe('RequestTable', () => {
  test('should be as the snapshot', () => {
    const initialState = { user: { user: { config: {} } } };
    const store = configureStore()(initialState);
    const component = renderer.create(
      <Provider store={store}>
        <RequestTable options={{}} />
      </Provider>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
