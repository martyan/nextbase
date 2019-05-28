import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changePassword, updateUser, setUser } from '../../lib/auth/actions'
import { auth } from '../../lib/firebase'
import TextInput from '../common/TextInput'
import Button from '../common/Button'
import './ChangeName.scss'

class ChangeName extends Component {

    static propTypes = {
        changePassword: PropTypes.func.isRequired,
        updateUser: PropTypes.func.isRequired,
        setUser: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
        user: PropTypes.object
    }

    state = {
        name: '',
        nameError: '',
        serverError: '',
        submitted: false,
        loading: false
    }

    componentDidMount = () => {
        const { user } = this.props

        this.setState({name: user.displayName || ''})
    }

    getValidation = (type, value) => {
        switch(type) {
            case 'name':
                if(!value.length) return 'Name is required'
                if(value.length < 3) return 'Password should be at least 3 characters long'
                return ''
            default:
                return ''
        }
    }

    validateInput = (key, value) => {
        const error = this.getValidation(key, value)
        this.setState({[key+'Error']: error})
        return error
    }

    isFormValid = () => {
        const { name } = this.state

        const nameError = this.validateInput('name', name)
        const nameValid = nameError.length === 0

        return nameValid
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { updateUser, setUser, close } = this.props
        const { name, loading } = this.state

        this.setState({submitted: true})

        if(!loading && this.isFormValid()) {
            this.setState({loading: true})

            updateUser({displayName: name})
                .then(() => setUser(auth.currentUser))
                .then(close)
                .catch(error => this.setState({serverError: error.code, loading: false}))
        }
    }

    render = () => {
        const { name, nameError, serverError, submitted, loading } = this.state

        return (
            <form className="change-name" onSubmit={this.handleSubmit}>

                <h1>Change name</h1>

                <TextInput
                    placeholder="Name"
                    value={name}
                    onChange={value => this.setState({name: value})}
                    error={submitted ? nameError : ''}
                    validate={value => this.validateInput('name', value)}
                />

                <Button loading={loading}>Save</Button>

                {serverError.length > 0 && <div className="server-error">{serverError}</div>}

            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        changePassword,
        updateUser,
        setUser
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ChangeName)

