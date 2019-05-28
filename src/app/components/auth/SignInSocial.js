import React from 'react'
import PropTypes from 'prop-types'
import { firebase } from '../../lib/firebase'
import './SignInSocial.scss'

class SignInSocial extends React.Component {

    static propTypes = {
        signIn: PropTypes.func.isRequired,
        onError: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired
    }

    static defaultProps = {
        close: () => {}
    }

    getProvider = (type) => {
        switch(type) {
            case 'google':
                const provider = new firebase.auth.GoogleAuthProvider()
                provider.addScope('https://www.googleapis.com/auth/userinfo.email')
                return provider

            case 'facebook':
                return new firebase.auth.FacebookAuthProvider()

            default:
                return null
        }
    }

    handleSignIn = (type) => {
        const { signIn, close, onError } = this.props

        const provider = this.getProvider(type)

        signIn(provider)
            .then(close)
            .catch(onError)
    }

    render = () => {
        return (
            <div className="sign-in-social">

                <p>Sign in using social platforms</p>

                <button className="fb" onClick={() => this.handleSignIn('facebook')}>
                    <i className="fa fa-facebook-square"></i>
                </button>

                <button className="google" onClick={() => this.handleSignIn('google')}>
                    <i className="fa fa-google-plus-square"></i>
                </button>

            </div>
        )
    }

}

export default SignInSocial
