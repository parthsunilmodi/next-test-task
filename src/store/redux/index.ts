import { combineReducers } from 'redux';
import coreSlice from './core/coreSlice';
import applicationSlice from './applications/applicationSlice';
import resourceSlice from './resources/resourceSlice';

export const rootReducer = combineReducers({
  core: coreSlice,
  applications: applicationSlice,
  resources: resourceSlice
});

export type IRootState = {
  core: ReturnType<typeof coreSlice>;
  applications: ReturnType<typeof applicationSlice>;
  resources: ReturnType<typeof resourceSlice>;
};
