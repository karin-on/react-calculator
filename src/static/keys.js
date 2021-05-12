export const keyRoles = {
  ADD: 'ADD',
  CLEAR: 'CLEAR',
  DIGIT: 'DIGIT',
  EQUALS: 'EQUALS',
  SEPARATOR: 'SEPARATOR',
  SUBTRACT: 'SUBTRACT',
};

const KEYS_ORDER = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '=', 'AC', '0', '.'];

const DIGIT_KEYS = [...Array(10).keys()].map(value => {
  return {
    role: keyRoles.DIGIT,
    value: value.toString(),
  }
});

const KEYS = [
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

KEYS_ORDER.forEach((el) => {
  const key = KEYS.find(({ value }) => value === el);
  const index = KEYS.indexOf(key);
  const movedKey = KEYS.splice(index, 1);
  KEYS.push(...movedKey);
});

export { KEYS };
