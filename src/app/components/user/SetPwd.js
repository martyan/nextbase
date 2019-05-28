import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setPassword, setUser } from '../../lib/auth/actions'
import TextInput from '../common/TextInput'
import Button from '../common/Button'
import './SetPwd.scss'

class SetPwd extends Component {

    static propTypes = {
        setPassword: PropTypes.func.isRequired,
        setUser: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
        user: PropTypes.object
    }

    state = {
        pwd: '',
        pwdAgain: '',
        pwdError: '',
        pwdAgainError: '',
        serverError: '',
        submitted: false,
        loading: false
    }

    getValidation = (type, value) => {
        switch(type) {
            case 'pwd':
                if(!value.length) return 'Password is required'
                if(value.length < 6) return 'Password should be at least 6 characters long'
                return ''
            case 'pwdAgain':
                if(!value.length) return 'Password is required'
                if(value !== this.state.pwd) return 'Passwords don\'t match'
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
        const { pwd, pwdAgain } = this.state

        const pwdError = this.validateInput('pwd', pwd)
        const pwdValid = pwdError.length === 0

        const pwdAgainError = this.validateInput('pwdAgain', pwdAgain)
        const pwdAgainValid = pwdAgainError.length === 0

        return (pwdValid && pwdAgainValid)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { user, setPassword, setUser, close } = this.props
        const { pwd, loading } = this.state

        this.setState({submitted: true})

        if(!loading && this.isFormValid()) {
            this.setState({loading: true})

            setPassword(user.email, pwd)
                .then(({user}) => setUser(user))
                .then(close)
                .catch(error => this.setState({serverError: error.code, loading: false}))
        }
    }

    render = () => {
        const { user } = this.props
        const { submitted, loading, pwd, pwdError, pwdAgain, pwdAgainError, serverError } = this.state

        return (
            <form className="set-pwd" onSubmit={this.handleSubmit}>

                <h1>Set password</h1>

                <TextInput
                    placeholder="Email"
                    value={user.email}
                    onChange={() => {}}
                    disabled
                />

                <TextInput
                    type="password"
                    placeholder="Password"
                    value={pwd}
                    onChange={value => this.setState({pwd: value})}
                    error={(submitted || pwd.length) > 0 ? pwdError : ''}
                    validate={value => this.validateInput('pwd', value)}
                />

                <TextInput
                    type="password"
                    placeholder="Password (again)"
                    value={pwdAgain}
                    onChange={value => this.setState({pwdAgain: value})}
                    error={(submitted || pwdAgain.length > 0) ? pwdAgainError : ''}
                    validate={value => this.validateInput('pwdAgain', value)}
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
        setPassword,
        setUser
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(SetPwd)

