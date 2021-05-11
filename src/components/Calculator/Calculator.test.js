import { render, screen } from '../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import { Calculator } from './Calculator';

describe('single-digit integers are displayed correctly', () => {
  test('1 is displayed', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey1 = screen.getByRole('button', { name: /1/ });
    userEvent.click(digitKey1);
    expect(display).toHaveTextContent(/^1$/);
  });
  test('5 is displayed', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey5 = screen.getByRole('button', { name: /5/ });
    userEvent.click(digitKey5);
    expect(display).toHaveTextContent(/^5$/);
  });
});

test('user cannot enter multiple 0', () => {
  render(<Calculator/>);
  const display = screen.getByTestId('display');
  const digitKey0 = screen.getByRole('button', { name: /0/ });
  userEvent.click(digitKey0);
  expect(display).toHaveTextContent(/^0$/);
  userEvent.click(digitKey0);
  expect(display).toHaveTextContent(/^0$/);
  userEvent.click(digitKey0);
  userEvent.click(digitKey0);
  expect(display).toHaveTextContent(/^0$/);
});

test('multi-digit integers are displayed correctly', () => {
  render(<Calculator/>);
  const display = screen.getByTestId('display');
  const digitKey0 = screen.getByRole('button', { name: /0/ });
  const digitKey3 = screen.getByRole('button', { name: /3/ });
  const digitKey8 = screen.getByRole('button', { name: /8/ });
  userEvent.click(digitKey3);
  userEvent.click(digitKey0);
  userEvent.click(digitKey8);
  expect(display).toHaveTextContent(/^308$/);
});

test('AC clears display', () => {
  render(<Calculator/>);
  const display = screen.getByTestId('display');
  const digitKey5 = screen.getByRole('button', { name: /5/ });
  const digitKey6 = screen.getByRole('button', { name: /6/ });
  const digitKey7 = screen.getByRole('button', { name: /7/ });
  const clearKey = screen.getByRole('button', { name: /AC/ });
  userEvent.click(digitKey5);
  userEvent.click(digitKey7);
  userEvent.click(digitKey6);
  expect(display).toHaveTextContent(/^576$/);
  userEvent.click(clearKey);
  expect(display).toHaveTextContent(/^0$/);
});
