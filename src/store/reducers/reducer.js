import * as actionTypes from '../actions/actionTypes';

const initialState = {
  displayedText: '0',
  firstVal: undefined,
  secondValProvided: false,
  operation: undefined,
  typing: false,
};

const operationTypes = {
  add: 'add',
  subtract: 'subtract',
};

const operations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
};

export const reducer = (state = initialState, action) => {
  const { displayedText, firstVal, secondValProvided, operation, typing } = state;
  const { type, value } = action;

  switch (type) {
    case actionTypes.SELECT_VALUE:
      // TODO: refactor
      let concatenatedValue;
      let newTyping;
      if (displayedText === '0' && value === 0) {
        concatenatedValue = '0';
        newTyping = false;
      } else {
        concatenatedValue = `${displayedText}${value}`;
        newTyping = true;
      }

      return {
        ...state,
        typing: newTyping,
        displayedText: typing ? concatenatedValue : `${value}`,
        secondValProvided: !!operation,
      };
    case actionTypes.ADD:
      if (secondValProvided) {
        const newTotal = [firstVal, parseFloat(displayedText)]
          .reduce((a, b) => operations[operation](a, b));

        return {
          ...state,
          typing: false,
          firstVal: newTotal, // total
          secondValProvided: false,
          displayedText: newTotal,
          operation: operationTypes.add,
        };
      }

      return {
        ...state,
        typing: false,
        firstVal: parseFloat(displayedText),
        operation: operationTypes.add,
      };

    case actionTypes.SUBTRACT:
      if (secondValProvided) {
        const newTotal = [firstVal, parseFloat(displayedText)]
          .reduce((a, b) => operations[operation](a, b));

        return {
          ...state,
          typing: false,
          firstVal: newTotal, // total
          secondValProvided: false,
          displayedText: newTotal,
          operation: operationTypes.subtract,
        };
      }

      return {
        ...state,
        typing: false,
        firstVal: parseFloat(displayedText),
        operation: operationTypes.subtract,
      };

    case actionTypes.EQUALS:
      if (!secondValProvided) {
        return;
      }

      const newTotal = [firstVal, parseFloat(displayedText)]
        .reduce((a, b) => operations[operation](a, b));

      return {
        ...state,
        typing: false,
        firstVal: newTotal, // total
        secondValProvided: false,
        displayedText: newTotal,
        operation: undefined,
      };

    case actionTypes.CLEAR:
      return initialState;
    default:
      return state;
  }
}
