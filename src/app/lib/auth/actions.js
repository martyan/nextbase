import { auth, storage, firebase } from '../firebase'

export const setUser = (user) => ({ type: 'SET_USER', user })

export const createUser = (email, password) => ({
    type: 'CREATE_USER',
    payload: auth.createUserWithEmailAndPassword(email, password)
})

export const signIn = (email, password) => ({
    type: 'SIGN_IN',
    payload: auth.signInWithEmailAndPassword(email, password)
})

export const signInSocial = (provider) => ({
    type: 'SIGN_IN_SOCIAL',
    payload: auth.signInWithPopup(provider)
})

export const signOut = () => ({
    type: 'SIGN_OUT',
    payload: auth.signOut()
})

export const sendPasswordResetEmail = (email) => ({
    type: 'SEND_PASSWORD_RESET_EMAIL',
    payload: auth.sendPasswordResetEmail(email)
})

export const sendVerificationEmail = () => ({
    type: 'SEND_VERIFICATION_EMAIL',
    payload: auth.currentUser.sendEmailVerification()
})

export const setPassword = (email, password) => ({
    type: 'SET_PASSWORD',
    payload: auth.currentUser.linkAndRetrieveDataWithCredential(firebase.auth.EmailAuthProvider.credential(email, password))
})

export const changePassword = (newPassword) => ({
    type: 'CHANGE_PASSWORD',
    payload: auth.currentUser.updatePassword(newPassword)
})

export const reauthenticate = (email, password) => ({
    type: 'REAUTHENTICATE',
    payload: auth.currentUser.reauthenticateAndRetrieveDataWithCredential(firebase.auth.EmailAuthProvider.credential(email, password))
})

export const updateUser = (data) => ({
    type: 'UPDATE_USER',
    payload: auth.currentUser.updateProfile(data)
})

export const uploadFile = (file, name, path) => ({
    type: 'UPLOAD_FILE',
    payload: new Promise((resolve, reject) => {
        const storageRef = storage.ref()

        const imageDir = storageRef.child(path)
        const task = imageDir.put(file)

        task.on('state_changed', snapshot => {
            const progress = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            console.log(progress)
        }, error => reject(error), () => resolve(task.snapshot))
    })
})
