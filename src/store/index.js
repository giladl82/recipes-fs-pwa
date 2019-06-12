import { createStore, compose } from 'redux';
import { reducers } from './reducers';

export const store = createStore(
  reducers,
  undefined,
  compose(
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);
