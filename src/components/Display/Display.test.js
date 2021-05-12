import { render, screen } from '../../test-utils/testing-library-utils';
import { Display } from './Display';

test('display renders and starts at 0', () => {
  render(<Display />);
  const display = screen.getByTestId('display');
  expect(display).toBeInTheDocument();
  expect(display).toHaveTextContent(/^0$/);
});
