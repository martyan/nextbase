import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTodo, updateTodo, deleteTodo, todoDeleted } from '../../lib/todo/actions'
import FlipMove from 'react-flip-move'
import Check from '../common/Check'
import './TodoList.scss'

class TodoList extends Component {

    static propTypes = {
        getTodo: PropTypes.func.isRequired,
        updateTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        todoDeleted: PropTypes.func.isRequired,
        todos: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    state = {
        hideCompleted: false,
        editingId: null,
        editingText: ''
    }

    toggleTodo = (todo) => {
        const { updateTodo, getTodo } = this.props

        updateTodo(todo.id, {checked: !todo.checked})
            .then(() => getTodo(todo.id))
            .catch(console.error)
    }

    deleteTodo = (todoId) => {
        const { deleteTodo, todoDeleted } = this.props

        deleteTodo(todoId)
            .then(() => todoDeleted(todoId))
            .catch(console.error)
    }

    handleClick = (todo) => {
        this.setState({editingId: todo.id, editingText: todo.todo}, () => {
            if(this.input) this.input.focus()
        })
    }

    handleBlur = (e) => {
        const { todos, updateTodo, getTodo } = this.props
        const { editingId, editingText } = this.state

        const todo = todos.find(todo => todo.id === editingId)

        if(!todo) return

        if(todo.todo !== editingText) {
            updateTodo(todo.id, {todo: editingText})
                .then(() => getTodo(todo.id))
                .then(() => this.setState({editingId: null}))
                .catch(console.error)
        } else {
            this.setState({editingId: null})
        }
    }

    handleKeyUp = (e) => {
        if(this.input && e.key === 'Enter') this.input.blur()
    }

    render = () => {
        const { todos } = this.props
        const { hideCompleted, editingId, editingText } = this.state

        return (
            <div className="todo-list">
                <label className="hide-completed">
                    <Check onChange={e => this.setState({hideCompleted: !hideCompleted})} checked={hideCompleted} />
                    <span>Hide completed</span>
                </label>

                <FlipMove>
                    {todos.filter(todo => hideCompleted ? !todo.checked : true).map(todo => (
                        <div key={todo.id} className="todo">
                            <Check
                                checked={todo.checked}
                                onChange={() => this.toggleTodo(todo)}
                            />

                            {editingId === todo.id ?
                                <input
                                    className="text"
                                    type="text"
                                    value={editingText}
                                    onChange={e => this.setState({editingText: e.target.value})}
                                    onBlur={this.handleBlur}
                                    onKeyUp={this.handleKeyUp}
                                    ref={elem => this.input = elem}
                                /> :
                                <div className="text" onClick={() => this.handleClick(todo)}>{todo.todo}</div>
                            }

                            <button className="delete" onClick={() => this.deleteTodo(todo.id)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </div>
                    ))}
                </FlipMove>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    todos: state.todo.todos
})

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        getTodo,
        updateTodo,
        deleteTodo,
        todoDeleted
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
