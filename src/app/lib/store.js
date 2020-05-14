import { createStore, applyMiddleware } from 'redux'
import { MakeStore, createWrapper, Context, HYDRATE } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from './promiseMiddleware'
import logger from './logger'
import reducer, { initialState } from './reducer'

// create a makeStore function
const makeStore = (context) => {
    const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware, promiseMiddleware, logger)))

    return store
}

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true})
