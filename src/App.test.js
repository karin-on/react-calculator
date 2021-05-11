import { render, screen } from './test-utils/testing-library-utils';
import { App } from './App';

test('renders learn react link', () => {
  render(<App />);
  // TODO: refactor (app vs container)
  const app = screen.getByTestId('container');
  expect(app).toBeInTheDocument();
});
