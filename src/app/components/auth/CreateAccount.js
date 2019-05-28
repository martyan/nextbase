import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createUser, sendVerificationEmail, signInSocial } from '../../lib/auth/actions'
import SignInSocial from './SignInSocial'
import TextInput from '../common/TextInput'
import Button from '../common/Button'
import './CreateAccount.scss'

class CreateAccount extends React.Component {

    static propTypes = {
        createUser: PropTypes.func.isRequired,
        signInSocial: PropTypes.func.isRequired,
        sendVerificationEmail: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired
    }

    state = {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        serverError: '',
        submitted: false,
        loading: false
    }

    getValidation = (type, value) => {
        switch(type) {
            case 'email':
                if(!value.length) return 'Email is required'
                if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) return 'Email is not valid'
                return ''
            case 'password':
                if(value.length === 0) return 'Password is required'
                if(value.length < 6) return 'Password must be at least 6 characters long'
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
        const { email, password } = this.state

        const emailError = this.validateInput('email', email)
        const emailValid = emailError.length === 0

        const pwdError = this.validateInput('password', password)
        const pwdValid = pwdError.length === 0

        return (emailValid && pwdValid)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { createUser, sendVerificationEmail, close } = this.props
        const { email, password } = this.state

        this.setState({submitted: true})

        if(this.isFormValid()) {
            this.setState({loading: true})

            createUser(email, password)
                .then(sendVerificationEmail)
                .then(close)
                .catch(this.handleError)
        }
    }

    handleError = (error) => {
        this.setState({serverError: error.code, loading: false})
    }

    render = () => {
        const { signInSocial, close } = this.props
        const { email, password, submitted, emailError, passwordError, serverError, loading } = this.state

        return (
            <div className="create-account">
                <form onSubmit={this.handleSubmit}>

                    <h1>Create new account</h1>

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChange={value => this.setState({email: value})}
                        error={submitted ? emailError : ''}
                        validate={value => this.validateInput('email', value)}
                    />

                    <TextInput
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={value => this.setState({password: value})}
                        error={submitted ? passwordError : ''}
                        validate={value => this.validateInput('password', value)}
                    />

                    <Button loading={loading}>Create account</Button>

                    {serverError.length > 0 && <div className="server-error">{serverError}</div>}

                </form>

                <SignInSocial
                    signIn={signInSocial}
                    onError={this.handleError}
                    close={close}
                />
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        createUser,
        sendVerificationEmail,
        signInSocial
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)
