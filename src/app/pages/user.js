import React from 'react'
import Head from 'next/head'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import withAuthentication from '../lib/withAuthentication'
import PageWrapper from '../components/PageWrapper'
import Modal from '../components/common/Modal'
import SetPwd from '../components/user/SetPwd'
import ChangePwd from '../components/user/ChangePwd'
import ChangeName from '../components/user/ChangeName'
import ImgUpload from '../components/user/ImgUpload'
import Header from '../components/Header'
import Button from '../components/common/Button'
import './user.scss'

class User extends React.Component {

    state = {
        setPwdVisible: false,
        changePwdVisible: false,
        changeNameVisible: false,
        imgUploadVisible: false
    }

    render = () => {
        const { user } = this.props
        const { setPwdVisible, changePwdVisible, changeNameVisible, imgUploadVisible } = this.state

        const hasPassword = !!user.providerData.find(provider => provider.providerId === 'password')

        return (
            <PageWrapper>
                <div className="user">

                    <Head>
                        <title>My account | Nextbase</title>
                    </Head>

                    <Header />

                    <div className="inner">
                        <div className="photo" style={{backgroundImage: `url(${user.photoURL || 'http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-hi.png'})`}}></div>
                        <div className="email">{user.email}</div>
                        <div className="name">{user.displayName}</div>

                        <Button onClick={() => this.setState({imgUploadVisible: true})}>Change profile picture</Button>
                        <Button onClick={() => this.setState({changeNameVisible: true})}>Change name</Button>
                        {hasPassword ?
                            <Button onClick={() => this.setState({changePwdVisible: true})}>Change password</Button> :
                            <Button onClick={() => this.setState({setPwdVisible: true})}>Set password</Button>
                        }
                    </div>

                    <Modal noPadding visible={imgUploadVisible} onClose={() => this.setState({imgUploadVisible: false})}>
                        <ImgUpload close={() => this.setState({imgUploadVisible: false})} />
                    </Modal>

                    <Modal noPadding visible={changeNameVisible} onClose={() => this.setState({changeNameVisible: false})}>
                        <ChangeName close={() => this.setState({changeNameVisible: false})} />
                    </Modal>

                    <Modal noPadding visible={setPwdVisible} onClose={() => this.setState({setPwdVisible: false})}>
                        <SetPwd close={() => this.setState({setPwdVisible: false})} />
                    </Modal>

                    <Modal noPadding visible={changePwdVisible} onClose={() => this.setState({changePwdVisible: false})}>
                        <ChangePwd close={() => this.setState({changePwdVisible: false})} />
                    </Modal>
                </div>
            </PageWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({}, dispatch)
)

export default compose(withAuthentication(true), connect(mapStateToProps, mapDispatchToProps))(User)
