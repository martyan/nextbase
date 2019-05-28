export default store => next => action => {
    console.info(action.type, action)
    return next(action)
}
