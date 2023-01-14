import { productReducer } from './../components/home/productReducer';
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

//Редюсер, який обєднує усі редюсери
export const rootReducer = combineReducers({
    product: productReducer
});

export const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk)));