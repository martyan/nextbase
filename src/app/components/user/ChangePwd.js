import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changePassword, reauthenticate } from '../../lib/auth/actions'
import TextInput from '../common/TextInput'
import Button from '../common/Button'
import './ChangePwd.scss'

class ChangePwd extends Component {

    static propTypes = {
        changePassword: PropTypes.func.isRequired,
        reauthenticate: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
        user: PropTypes.object
    }

    state = {
        oldPwd: '',
        newPwd: '',
        oldPwdError: '',
        newPwdError: '',
        serverError: '',
        submitted: false,
        loading: false
    }

    getValidation = (type, value) => {
        switch(type) {
            case 'oldPwd':
                if(!value.length) return 'Password is required'
                if(value.length < 6) return 'Password should be at least 6 characters long'
                return ''
            case 'newPwd':
                if(!value.length) return 'Password is required'
                if(value.length < 6) return 'Password should be at least 6 characters long'
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
        const { oldPwd, newPwd } = this.state

        const oldPwdError = this.validateInput('oldPwd', oldPwd)
        const oldPwdValid = oldPwdError.length === 0

        const newPwdError = this.validateInput('newPwd', newPwd)
        const newPwdValid = newPwdError.length === 0

        return (oldPwdValid && newPwdValid)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { user, changePassword, reauthenticate, close } = this.props
        const { oldPwd, newPwd, loading } = this.state

        this.setState({submitted: true})

        if(!loading && this.isFormValid()) {
            this.setState({loading: true})

            reauthenticate(user.email, oldPwd)
                .then(() => changePassword(newPwd))
                .then(close)
                .catch(error => this.setState({serverError: error.code, loading: false}))
        }
    }

    render = () => {
        const { oldPwd, newPwd, oldPwdError, newPwdError, submitted, serverError, loading } = this.state

        return (
            <form className="change-pwd" onSubmit={this.handleSubmit}>

                <h1>Change password</h1>

                <TextInput
                    type="password"
                    placeholder="Current password"
                    value={oldPwd}
                    onChange={value => this.setState({oldPwd: value})}
                    error={submitted ? oldPwdError : ''}
                    validate={value => this.validateInput('oldPwd', value)}
                />

                <TextInput
                    type="password"
                    placeholder="New password"
                    value={newPwd}
                    onChange={value => this.setState({newPwd: value})}
                    error={submitted ? newPwdError : ''}
                    validate={value => this.validateInput('newPwd', value)}
                />

                <Button loading={loading}>Change password</Button>

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
        reauthenticate
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ChangePwd)

