 import selectReducer from './select';
 import {combineReducers} from 'redux'

 const rootReducer = combineReducers({
     heros : selectReducer
 })

export default rootReducer