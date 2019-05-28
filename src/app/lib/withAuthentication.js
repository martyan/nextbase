import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { auth } from './firebase'
import { setUser } from './auth/actions'
import SignIn from '../components/auth/SignIn'
import VerifyEmail from '../components/auth/VerifyEmail'
import Header from '../components/Header'

const withAuthentication = (needsAuthentication) => (Component) => {

    class WithAuthentication extends React.Component {
        componentDidMount() {
            const { setUser } = this.props

            auth.onAuthStateChanged(user => {
                user
                    ? setUser(user)
                    : setUser(null)
            })
        }

        renderAuth = (children) => (
            <div>
                <Header noSignIn />
                {children}
            </div>
        )

        render() {
            const { user } = this.props

            if(!user && needsAuthentication) return this.renderAuth(<SignIn />)

            const hasPassword = user && user.providerData.find(provider => provider.providerId === 'password')

            if(user && hasPassword && !user.emailVerified) return this.renderAuth(<VerifyEmail />)

            return <Component { ...this.props } />
        }
    }

    WithAuthentication.getInitialProps = Component.getInitialProps

    const mapStateToProps = (state) => ({
        user: state.auth.user
    })

    const mapDispatchToProps = (dispatch) => (
        bindActionCreators({
            setUser
        }, dispatch)
    )

    return connect(mapStateToProps, mapDispatchToProps)(WithAuthentication)

}

export default withAuthentication
