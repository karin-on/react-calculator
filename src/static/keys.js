const keyRoles = {
  DIGIT: 'DIGIT',
  OPERATOR: 'OPERATOR',
  SEPARATOR: 'SEPARATOR',
};

const DIGIT_KEYS = [...Array(10).keys()].map(value => {
  return {
    value,
    cssClass: `digitKey-${value}`,
    role: keyRoles.DIGIT, // TODO: czy potrzebne?
  }
});

export const KEYS = [
  ...DIGIT_KEYS,
  {
    value: 'AC',
    cssClass: 'digitKey',
    role: keyRoles.OPERATOR,
  },
  {
    value: '+',
    cssClass: 'plusKey',
    role: keyRoles.OPERATOR,
  },
  {
    value: '-',
    cssClass: 'minusKey',
    role: keyRoles.OPERATOR,
  },
  {
    value: '=',
    cssClass: 'equalsKey',
    role: keyRoles.OPERATOR,
  },
  {
    value: '.',
    cssClass: 'separatorKey',
    role: keyRoles.SEPARATOR,
  }
];
