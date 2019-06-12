import { combineReducers } from 'redux';
import { reducer as user} from './Auth/reducer';
import { reducer as recipes} from './Recipes/reducer';

export const reducers = combineReducers({
  user,
  recipes
});
