import { combineReducers } from 'redux'
import auth, { initialState as initialStateAuth } from './auth/reducer'
import todo, { initialState as initialStateTodo } from './todo/reducer'

export const initialState = {
    auth: initialStateAuth,
    todo: initialStateTodo
}

export default combineReducers({
    auth,
    todo
})
