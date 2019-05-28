import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { sendVerificationEmail } from '../../lib/auth/actions'
import './VerifyEmail.scss'

class VerifyEmail extends React.Component {

    static propTypes = {
        sendVerificationEmail: PropTypes.func.isRequired
    }

    state = {
        sent: false
    }

    sendVerificationEmail = () => {
        const { sendVerificationEmail } = this.props

        sendVerificationEmail()
            .then(() => this.setState({sent: true}))
            .catch(console.error)
    }

    render = () => {
        const { user } = this.props
        const { sent } = this.state

        return (
            <div className="verify-email">

                <h1>Verify your email address</h1>

                <p>Please check your mailbox <b>{user.email}</b>. A verification email is waiting for you.</p>

                {!sent ?
                    <p>Did not receive the email? <a onClick={this.sendVerificationEmail}>Send again</a></p> :
                    <p><b>Verification email sent!</b></p>
                }

            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        sendVerificationEmail
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)

