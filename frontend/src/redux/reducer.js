import { combineReducers } from "redux";
import notesReducer from "./slices/notesSlice";
import categoriesReducer from "./slices/categoriesSlice";

const rootReducer = combineReducers({
  notes: notesReducer,
  categories: categoriesReducer
  });
  
  export default rootReducer;