import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signOut } from '../lib/auth/actions'
import Modal from './common/Modal'
import CreateAccount from './auth/CreateAccount'
import SignIn from './auth/SignIn'
import './Header.scss'

class Header extends React.Component {

    static propTypes = {
        user: PropTypes.object,
        noSignIn: PropTypes.bool
    }

    state = {
        createAccountVisible: false,
        signInVisible: false
    }

    signOut = () => {
        const { signOut } = this.props

        signOut()
            .catch(console.error)
    }

    render = () => {
        const { user, noSignIn } = this.props
        const { createAccountVisible, signInVisible } = this.state

        return (
            <>
                <header>
                    <div className="logo">
                        <Link href="/"><a>Nextbase</a></Link>
                    </div>

                    {!user ?
                        <div className="auth">
                            <a onClick={() => this.setState({createAccountVisible: true})}>Create account</a>
                            {!noSignIn && (
                                <>
                                    <span className="spacer">|</span>
                                    <a onClick={() => this.setState({signInVisible: true})}>Sign in</a>
                                </>
                            )}
                        </div> :
                        <div className="auth">
                            <Link href="/user"><a className="email">{user.email}</a></Link>
                            <span className="spacer">|</span>
                            <a onClick={this.signOut}>Sign out</a>
                        </div>
                    }
                </header>

                <Modal noPadding visible={createAccountVisible} onClose={() => this.setState({createAccountVisible: false})}>
                    <CreateAccount close={() => this.setState({createAccountVisible: false})} />
                </Modal>

                <Modal noPadding visible={signInVisible} onClose={() => this.setState({signInVisible: false})}>
                    <SignIn close={() => this.setState({signInVisible: false})} />
                </Modal>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        signOut
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Header)
