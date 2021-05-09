import { render, screen } from '@testing-library/react';
import { Keyboard } from './Keyboard';

test('keyboard renders and contains 15 keys', () => {
  render(<Keyboard />);
  const keyboard = screen.getByTestId('keyboard');
  const keys = screen.getAllByTestId('key');

  expect(keyboard).toBeInTheDocument();
  expect(keys).toHaveLength(15);
});
