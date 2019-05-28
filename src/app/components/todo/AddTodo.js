import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTodo, createTodo } from '../../lib/todo/actions'
import { firebase } from '../../lib/firebase'
import Button from '../common/Button'
import TextInput from '../common/TextInput'
import './AddTodo.scss'

class AddTodo extends Component {

    static propTypes = {
        createTodo: PropTypes.func.isRequired,
        getTodo: PropTypes.func.isRequired
    }

    state = {
        value: '',
        loading: false
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { createTodo, getTodo } = this.props
        const { value, loading } = this.state

        if(value.length === 0 || loading) return

        this.setState({loading: true})

        const todo = {
            todo: value,
            checked: false,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date())
        }

        createTodo(todo)
            .then(ref => getTodo(ref.id))
            .then(() => this.setState({value: '', loading: false}))
            .catch(console.error)
    }

    render = () => {
        const { value, loading } = this.state

        return (
            <form className="add-todo" onSubmit={this.handleSubmit}>
                <TextInput
                    value={value}
                    onChange={value => this.setState({value})}
                    placeholder="Go get some milk"
                />

                <Button loading={loading}>Add todo</Button>
            </form>
        )
    }

}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        getTodo,
        createTodo
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
