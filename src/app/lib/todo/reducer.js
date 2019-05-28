export const initialState = {
    todos: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODOS_SUCCESS':
            return {...state, todos: action.payload}

        case 'GET_TODO_SUCCESS': {
            const todo = state.todos.find(todo => todo.id === action.payload.id)

            if(todo) {
                return {...state, todos: state.todos.map(todo => {
                        if(todo.id === action.payload.id) return action.payload
                        return todo
                    })}
            }

            return {...state, todos: [action.payload, ...state.todos]}
        }

        case 'TODO_DELETED':
            return {...state, todos: state.todos.filter(todo => todo.id !== action.todoId)}

        default:
            return state
    }
}

export default reducer
