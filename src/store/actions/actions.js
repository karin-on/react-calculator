import * as actionTypes from '../actions/actionTypes';

export const add = () => ({ type: actionTypes.ADD });
export const clear = () => ({ type: actionTypes.CLEAR });
export const equals = () => ({ type: actionTypes.EQUALS });
export const selectValue = (value) => ({ type: actionTypes.SELECT_VALUE, value });
export const separate = () => ({ type: actionTypes.SEPARATE });
export const subtract = () => ({ type: actionTypes.SUBTRACT });
