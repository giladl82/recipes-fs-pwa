import { SET_RECIPES } from './action-types';

export const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_RECIPES:
      return action.recipes || [];
    default:
      return state;
  }
};
