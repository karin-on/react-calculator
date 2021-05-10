export const keyRoles = {
  ADD: 'ADD',
  CLEAR: 'CLEAR',
  DIGIT: 'DIGIT',
  EQUALS: 'EQUALS',
  SEPARATOR: 'SEPARATOR',
  SUBTRACT: 'SUBTRACT',
};

const DIGIT_KEYS = [...Array(10).keys()].map(value => {
  return {
    role: keyRoles.DIGIT,
    value,
  }
});

export const KEYS = [
  ...DIGIT_KEYS,
  {
    role: keyRoles.ADD,
    value: '+',
  },
  {
    role: keyRoles.CLEAR,
    value: 'AC',
  },
  {
    role: keyRoles.EQUALS,
    value: '=',
  },
  {
    role: keyRoles.SEPARATOR,
    value: '.',
  },
  {
    role: keyRoles.SUBTRACT,
    value: '-',
  }
];
