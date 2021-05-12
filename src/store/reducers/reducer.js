import * as actionTypes from '../actions/actionTypes';
import { getTotal } from '../../helpers/get-total';
import { operationTypes } from '../../static/operation-types';

const initialState = {
  displayedText: '0',
  firstVal: undefined,
  secondValProvided: false,
  operation: undefined,
  typing: false,
  decimal: false,
};

export const reducer = (state = initialState, action) => {
  const { displayedText, total, secondValProvided, operation, typing, decimal } = state;
  const { type, value } = action;

  switch (type) {
    case actionTypes.SELECT_VALUE:
      let concatenatedValue;
      let newTyping;
      if (displayedText === '0' && value === '0') {
        concatenatedValue = '0';
        newTyping = false;
      } else {
        concatenatedValue = `${displayedText}${value}`;
        newTyping = true;
      }

      return {
        ...state,
        typing: newTyping,
        displayedText: typing ? concatenatedValue : value,
        secondValProvided: !!operation,
      };

    case actionTypes.SEPARATE:
      if (decimal) {
        return state;
      }
      return {
        ...state,
        typing: true,
        decimal: true,
        displayedText: typing ? `${displayedText}.` : '0.',
      }

    case actionTypes.ADD:
      if (secondValProvided) {
        const newTotal = getTotal(total, displayedText, operation).toString();

        return {
          ...state,
          typing: false,
          total: newTotal,
          secondValProvided: false,
          displayedText: newTotal,
          operation: operationTypes.add,
          decimal: false,
        };
      }
      return {
        ...state,
        typing: false,
        total: displayedText,
        operation: operationTypes.add,
        decimal: false,
      };

    case actionTypes.SUBTRACT:
      if (secondValProvided) {
        const newTotal = getTotal(total, displayedText, operation).toString();

        return {
          ...state,
          typing: false,
          total: newTotal,
          secondValProvided: false,
          displayedText: newTotal,
          operation: operationTypes.subtract,
          decimal: false,
        };
      }
      return {
        ...state,
        typing: false,
        total: displayedText,
        operation: operationTypes.subtract,
        decimal: false,
      };

    case actionTypes.EQUALS:
      if (!secondValProvided) {
        return state;
      }

      const newTotal = getTotal(total, displayedText, operation).toString();
      return {
        ...state,
        typing: false,
        total: newTotal,
        secondValProvided: false,
        displayedText: newTotal,
        operation: undefined,
        decimal: false,
      };

    case actionTypes.CLEAR:
      return initialState;

    default:
      return state;
  }
}
