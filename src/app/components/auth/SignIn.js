import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signIn, sendPasswordResetEmail, signInSocial } from '../../lib/auth/actions'
import SignInSocial from './SignInSocial'
import TextInput from '../common/TextInput'
import Button from '../common/Button'
import './SignIn.scss'

class SignIn extends React.Component {

    static propTypes = {
        signIn: PropTypes.func.isRequired,
        signInSocial: PropTypes.func.isRequired,
        close: PropTypes.func
    }

    static defaultProps = {
        close: () => {}
    }

    state = {
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        serverError: '',
        submitted: false,
        loading: false,
        forgottenPwd: false
    }

    getValidation = (type, value) => {
        switch(type) {
            case 'email':
                if(!value.length) return 'Email is required'
                if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) return 'Email is not valid'
                return ''
            case 'password':
                if(value.length === 0) return 'Password is required'
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
        const { email, password, forgottenPwd } = this.state

        const emailError = this.validateInput('email', email)
        const emailValid = emailError.length === 0

        if(forgottenPwd) return emailValid

        const pwdError = this.validateInput('password', password)
        const pwdValid = pwdError.length === 0

        return (emailValid && pwdValid)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { signIn, sendPasswordResetEmail, close } = this.props
        const { email, password, forgottenPwd } = this.state

        this.setState({submitted: true})

        if(this.isFormValid()) {
            this.setState({loading: true})

            if(forgottenPwd) {
                sendPasswordResetEmail(email)
                    .then(() => this.setState({forgottenPwd: false, serverError: `We've sent password reset form to your inbox`}))
                    .catch(this.handleError)
            } else {
                signIn(email, password)
                    .then(close)
                    .catch(this.handleError)
            }
        }
    }

    handleError = (error) => {
        this.setState({serverError: error.code, loading: false})
    }

    render = () => {
        const { signInSocial, close } = this.props
        const { email, password, emailError, passwordError, submitted, serverError, forgottenPwd, loading } = this.state

        return (
            <div className="sign-in">
                <form onSubmit={this.handleSubmit}>

                    <h1>{!forgottenPwd ? 'Sign in' : 'Forgotten password'}</h1>

                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChange={value => this.setState({email: value})}
                        error={submitted ? emailError : ''}
                        validate={value => this.validateInput('email', value)}
                    />

                    {!forgottenPwd && (
                        <TextInput
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={value => this.setState({password: value})}
                            error={submitted ? passwordError : ''}
                            validate={value => this.validateInput('password', value)}
                        />
                    )}

                    <Button loading={loading}>
                        {!forgottenPwd ? 'Sign in' : 'Send password reset'}
                    </Button>

                    {serverError.length > 0 && <div className="server-error">{serverError}</div>}

                    <div className="forgotten">
                        <a onClick={() => this.setState({forgottenPwd: !forgottenPwd})}>{!forgottenPwd ? 'Forgot your password?' : 'Try to sign in'}</a>
                    </div>

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
        signIn,
        signInSocial,
        sendPasswordResetEmail
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

