import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uploadFile, updateUser, setUser } from '../../lib/auth/actions'
import { auth } from '../../lib/firebase'
import Button from '../common/Button'
import './ImgUpload.scss'

class ImgUpload extends Component {

    static propTypes = {
        uploadFile: PropTypes.func.isRequired,
        updateUser: PropTypes.func.isRequired,
        setUser: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
        user: PropTypes.object
    }

    state = {
        serverError: '',
        loading: false
    }

    handleFileChange = () => {
        const filename = (this.file && this.file.files.length) ? this.file.files[0].name : ''
        this.setState({filename})
    }

    uploadFile = (e) => {
        e.preventDefault()
        const { user, uploadFile, updateUser, setUser, close } = this.props
        const file = this.file.files[0]

        if(!file) return

        this.setState({loading: true})

        const ext = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
        const time = new Date().getTime()
        const name = `${user.uid}.${ext}`
        const path = `images/${name}`

        uploadFile(file, name, path)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(downloadURL => updateUser({photoURL: downloadURL}))
            .then(() => setUser(auth.currentUser))
            .then(close)
            .catch(error => this.setState({serverError: error.code, loading: false}))
    }

    render = () => {
        const { serverError, loading } = this.state

        return (
            <form className="img-upload" onSubmit={this.uploadFile}>

                <h1>Change profile picture</h1>

                <input id="file" ref={elem => this.file = elem} type="file" onChange={this.handleFileChange}/>

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
        uploadFile,
        updateUser,
        setUser
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ImgUpload)

