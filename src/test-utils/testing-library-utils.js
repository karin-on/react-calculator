import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react';
import { createStore } from 'redux';
import { reducer } from '../store/reducers/reducer';

afterEach(cleanup);

const renderWithRedux = (
  ui,
  { initialState, store = createStore(reducer, initialState) } = {},
) => ({
  ...render(<Provider store={store}>{ui}</Provider>),
  store,
});

export * from '@testing-library/react';
export { renderWithRedux as render };
