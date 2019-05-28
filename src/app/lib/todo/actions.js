import { db } from '../firebase'

export const todoDeleted = (todoId) => ({ type: 'TODO_DELETED', todoId })

export const getTodos = () => ({
    type: 'GET_TODOS',
    payload: db.collection('todos').orderBy('createdAt', 'desc').get()
})

export const getTodo = (todoId) => ({
    type: 'GET_TODO',
    payload: db.collection('todos').doc(todoId).get()
})

export const createTodo = (todo) => ({
    type: 'CREATE_TODO',
    payload: db.collection('todos').add(todo)
})

export const updateTodo = (todoId, todo) => ({
    type: 'UPDATE_TODO',
    payload: db.collection('todos').doc(todoId).update(todo)
})

export const deleteTodo = (todoId) => ({
    type: 'DELETE_TODO',
    payload: db.collection('todos').doc(todoId).delete()
})
