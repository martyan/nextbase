export const getData = (res) => {
    if(!res) return null

    if(res.forEach) {
        let data = []
        res.forEach(item => {
            data.push({...item.data(), id: item.id})
        })
        return data
    }

    if(res.data) {
        return {...res.data(), id: res.id}
    }

    return res
}

const isPromise = (v) => v && typeof v.then === 'function'

const promiseMiddleware = store => next => action => {
    if(isPromise(action.payload)) {

        next({type: `${action.type}_REQUEST`})

        return action.payload.then(
            res => {
                const data = getData(res)

                next({
                    type: `${action.type}_SUCCESS`,
                    payload: data
                })

                return Promise.resolve(data)
            },
            error => {
                next({
                    type: `${action.type}_FAILURE`,
                    payload: error
                })

                return Promise.reject(error)
            }
        )

    }

    next(action)
}

export default promiseMiddleware
