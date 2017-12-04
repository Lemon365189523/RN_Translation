import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

//引入所有的reducers.
import reducers from '../reducers/index';

//添加中间件
const middlewares = [];
middlewares.push(thunk);

//配置store信息
let createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

let store = createStoreWithMiddleware(reducers);

export default store;
