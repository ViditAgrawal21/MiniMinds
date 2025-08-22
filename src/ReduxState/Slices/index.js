import {combineReducers} from '@reduxjs/toolkit';

// Import your slices here
import authSlice from './authSlice';

const rootReducer = combineReducers({
  // Add your slices here
  auth: authSlice,
});

export default rootReducer;
