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
  test('50000000000 is displayed', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey5 = screen.getByRole('button', { name: /5/ });
    const digitKey0 = screen.getByRole('button', { name: /0/ });
    userEvent.click(digitKey5);
    userEvent.click(digitKey0);
    userEvent.click(digitKey0);
    userEvent.click(digitKey0);
    userEvent.click(digitKey0);
    userEvent.click(digitKey0);
    userEvent.click(digitKey0);
    userEvent.click(digitKey0);
    userEvent.click(digitKey0);
    userEvent.click(digitKey0);
    userEvent.click(digitKey0);
    expect(display).toHaveTextContent(/^50000000000$/);
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

describe('decimals are displayed correctly', () => {
  test('- when typing starts with .', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const separatorKey = screen.getByRole('button', { name: /\./});
    const digitKey9 = screen.getByRole('button', { name: /9/ });
    userEvent.click(separatorKey);
    userEvent.click(digitKey9);
    expect(display).toHaveTextContent(/^0\.9$/);
  });
  test('- when typing starts with "0". only one separator per value can be added', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const separatorKey = screen.getByRole('button', { name: /\./ });
    const digitKey0 = screen.getByRole('button', { name: /0/ });
    const digitKey2 = screen.getByRole('button', { name: /2/ });
    userEvent.click(digitKey0);
    userEvent.click(separatorKey);
    userEvent.click(digitKey0);
    userEvent.click(separatorKey);
    userEvent.click(digitKey2);
    expect(display).toHaveTextContent(/^0\.02$/);
  });
  test('- when many digits are entered after separator', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const separatorKey = screen.getByRole('button', { name: /\./ });
    const digitKey1 = screen.getByRole('button', { name: /1/ });
    const digitKey2 = screen.getByRole('button', { name: /2/ });
    const digitKey5 = screen.getByRole('button', { name: /5/ });
    userEvent.click(digitKey1);
    userEvent.click(separatorKey);
    userEvent.click(digitKey2);
    userEvent.click(digitKey5);
    userEvent.click(digitKey2);
    userEvent.click(digitKey5);
    expect(display).toHaveTextContent(/^1\.2525$/);
  });
});

describe('pressing separator starts with "0."', () => {
  test('- when start typing', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const separatorKey = screen.getByRole('button', { name: /\./ });
    userEvent.click(separatorKey);
    expect(display).toHaveTextContent(/^0\.$/);
  });
  test('- after PLUS is pressed', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey7 = screen.getByRole('button', { name: /7/ });
    const separatorKey = screen.getByRole('button', { name: /\./ });
    const addKey = screen.getByRole('button', { name: /\+/ });
    userEvent.click(digitKey7);
    userEvent.click(addKey);
    userEvent.click(separatorKey);
    expect(display).toHaveTextContent(/^0\.$/);
  });
  test('- after MINUS is pressed', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey1 = screen.getByRole('button', { name: /1/ });
    const digitKey8 = screen.getByRole('button', { name: /8/ });
    const separatorKey = screen.getByRole('button', { name: /\./ });
    const subtractKey = screen.getByRole('button', { name: /\-/ });
    userEvent.click(digitKey8);
    userEvent.click(subtractKey);
    userEvent.click(digitKey1);
    userEvent.click(subtractKey);
    userEvent.click(separatorKey);
    expect(display).toHaveTextContent(/^0\.$/);
  });
  test('- after EQUALS is pressed', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const separatorKey = screen.getByRole('button', { name: /\./ });
    const addKey = screen.getByRole('button', { name: /\+/ });
    const equalsKey = screen.getByRole('button', { name: /\=/ });
    const digitKey2 = screen.getByRole('button', { name: /2/ });
    const digitKey0 = screen.getByRole('button', { name: /0/ });
    userEvent.click(digitKey2);
    userEvent.click(digitKey2);
    userEvent.click(addKey);
    userEvent.click(digitKey0);
    userEvent.click(equalsKey);
    userEvent.click(separatorKey);
    expect(display).toHaveTextContent(/^0\.$/);
  });
  test('- after AC is pressed', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey1 = screen.getByRole('button', { name: /1/ });
    const separatorKey = screen.getByRole('button', { name: /\./ });
    const clearKey = screen.getByRole('button', { name: /ac/i });
    userEvent.click(digitKey1);
    userEvent.click(clearKey);
    userEvent.click(separatorKey);
    expect(display).toHaveTextContent(/^0\.$/);
  });
});

describe('short operations:', () => {
  test('- adding integers: 1 + 4 = 5', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey1 = screen.getByRole('button', { name: /1/ });
    const digitKey4 = screen.getByRole('button', { name: /4/ });
    const addKey = screen.getByRole('button', { name: /\+/ });
    const equalsKey = screen.getByRole('button', { name: /\=/ });
    userEvent.click(digitKey1);
    userEvent.click(addKey);
    userEvent.click(digitKey4);
    userEvent.click(equalsKey);
    expect(display).toHaveTextContent(/^5$/);
  });
  test('- subtracting integers: 1 - 10 = -9', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey1 = screen.getByRole('button', { name: /1/ });
    const digitKey0 = screen.getByRole('button', { name: /0/ });
    const subtractKey = screen.getByRole('button', { name: /\-/ });
    const equalsKey = screen.getByRole('button', { name: /\=/ });
    userEvent.click(digitKey1);
    userEvent.click(subtractKey);
    userEvent.click(digitKey1);
    userEvent.click(digitKey0);
    userEvent.click(equalsKey);
    expect(display).toHaveTextContent(/^\-9$/);
  });
  test('- adding integers and decimals: 8 + 4.1 = 12.1', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey1 = screen.getByRole('button', { name: /1/ });
    const digitKey4 = screen.getByRole('button', { name: /4/ });
    const digitKey8 = screen.getByRole('button', { name: /8/ });
    const separatorKey = screen.getByRole('button', { name: /\./ });
    const addKey = screen.getByRole('button', { name: /\+/ });
    const equalsKey = screen.getByRole('button', { name: /\=/ });
    userEvent.click(digitKey8);
    userEvent.click(addKey);
    userEvent.click(digitKey4);
    userEvent.click(separatorKey);
    userEvent.click(digitKey1);
    userEvent.click(equalsKey);
    expect(display).toHaveTextContent(/^12\.1$/);
  });
  test('- adding decimals: 5.3 + 4.1 = 9.4', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey1 = screen.getByRole('button', { name: /1/ });
    const digitKey3 = screen.getByRole('button', { name: /3/ });
    const digitKey4 = screen.getByRole('button', { name: /4/ });
    const digitKey5 = screen.getByRole('button', { name: /5/ });
    const separatorKey = screen.getByRole('button', { name: /\./ });
    const addKey = screen.getByRole('button', { name: /\+/ });
    const equalsKey = screen.getByRole('button', { name: /\=/ });
    userEvent.click(digitKey5);
    userEvent.click(separatorKey);
    userEvent.click(digitKey3);
    userEvent.click(addKey);
    userEvent.click(digitKey4);
    userEvent.click(separatorKey);
    userEvent.click(digitKey1);
    userEvent.click(equalsKey);
    expect(display).toHaveTextContent(/^9\.4$/);
  });
  test('- subtracting decimals: 5.3 - 4.1 = 1.2', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey1 = screen.getByRole('button', { name: /1/ });
    const digitKey3 = screen.getByRole('button', { name: /3/ });
    const digitKey4 = screen.getByRole('button', { name: /4/ });
    const digitKey5 = screen.getByRole('button', { name: /5/ });
    const separatorKey = screen.getByRole('button', { name: /\./ });
    const subtractKey = screen.getByRole('button', { name: /\-/ });
    const equalsKey = screen.getByRole('button', { name: /\=/ });
    userEvent.click(digitKey5);
    userEvent.click(separatorKey);
    userEvent.click(digitKey3);
    userEvent.click(subtractKey);
    userEvent.click(digitKey4);
    userEvent.click(separatorKey);
    userEvent.click(digitKey1);
    userEvent.click(equalsKey);
    expect(display).toHaveTextContent(/^1\.2$/);
  });
});

describe('sequential operations:', () => {
  test('- adding: 1 + 4 + 5.5 + 11 = 21.5', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey1 = screen.getByRole('button', { name: /1/ });
    const digitKey4 = screen.getByRole('button', { name: /4/ });
    const digitKey5 = screen.getByRole('button', { name: /5/ });
    const addKey = screen.getByRole('button', { name: /\+/ });
    const separatorKey = screen.getByRole('button', { name: /\./ });
    const equalsKey = screen.getByRole('button', { name: /\=/ });
    userEvent.click(digitKey1);
    userEvent.click(addKey);
    userEvent.click(digitKey4);
    userEvent.click(addKey);
    userEvent.click(digitKey5);
    userEvent.click(separatorKey);
    userEvent.click(digitKey5);
    userEvent.click(addKey);
    userEvent.click(digitKey1);
    userEvent.click(digitKey1);
    userEvent.click(equalsKey);
    expect(display).toHaveTextContent(/^21\.5$/);
  });
  test('- subtracting: 1 - 4.4 - 5 - 11 = -19.4', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey1 = screen.getByRole('button', { name: /1/ });
    const digitKey4 = screen.getByRole('button', { name: /4/ });
    const digitKey5 = screen.getByRole('button', { name: /5/ });
    const subtractKey = screen.getByRole('button', { name: /\-/ });
    const separatorKey = screen.getByRole('button', { name: /\./ });
    const equalsKey = screen.getByRole('button', { name: /\=/ });
    userEvent.click(digitKey1);
    userEvent.click(subtractKey);
    userEvent.click(digitKey4);
    userEvent.click(separatorKey);
    userEvent.click(digitKey4);
    userEvent.click(subtractKey);
    userEvent.click(digitKey5);
    userEvent.click(subtractKey);
    userEvent.click(digitKey1);
    userEvent.click(digitKey1);
    userEvent.click(equalsKey);
    expect(display).toHaveTextContent(/^\-19\.4$/);
  });
  test('- adding and subtracting: 1 + 4 - 5 + 11 = 11', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey1 = screen.getByRole('button', { name: /1/ });
    const digitKey4 = screen.getByRole('button', { name: /4/ });
    const digitKey5 = screen.getByRole('button', { name: /5/ });
    const addKey = screen.getByRole('button', { name: /\+/ });
    const subtractKey = screen.getByRole('button', { name: /\-/ });
    const equalsKey = screen.getByRole('button', { name: /\=/ });
    userEvent.click(digitKey1);
    userEvent.click(addKey);
    userEvent.click(digitKey4);
    userEvent.click(subtractKey);
    userEvent.click(digitKey5);
    userEvent.click(addKey);
    userEvent.click(digitKey1);
    userEvent.click(digitKey1);
    userEvent.click(equalsKey);
    expect(display).toHaveTextContent(/^11$/);
  });
  test('- cumulating previous results: 1 + 4 = ... + 5 - 11 = ... - 0 = -1', () => {
    render(<Calculator/>);
    const display = screen.getByTestId('display');
    const digitKey0 = screen.getByRole('button', { name: /0/ });
    const digitKey1 = screen.getByRole('button', { name: /1/ });
    const digitKey4 = screen.getByRole('button', { name: /4/ });
    const digitKey5 = screen.getByRole('button', { name: /5/ });
    const addKey = screen.getByRole('button', { name: /\+/ });
    const subtractKey = screen.getByRole('button', { name: /\-/ });
    const equalsKey = screen.getByRole('button', { name: /\=/ });
    userEvent.click(digitKey1);
    userEvent.click(addKey);
    userEvent.click(digitKey4);
    userEvent.click(equalsKey);
    userEvent.click(addKey);
    userEvent.click(digitKey5);
    userEvent.click(subtractKey);
    userEvent.click(digitKey1);
    userEvent.click(digitKey1);
    userEvent.click(equalsKey);
    userEvent.click(subtractKey);
    userEvent.click(digitKey0);
    userEvent.click(subtractKey);
    expect(display).toHaveTextContent(/^\-1$/);
  });
});
