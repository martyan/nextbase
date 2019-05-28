import React, { Component } from 'react'
import ReactGA from 'react-ga'
import Router from 'next/router'

const debug = process.env.NODE_ENV !== 'production'

const GAWrapper = (WrappedComponent) => (
    class GaWrapper extends Component {

        componentDidMount = () => {
            this.initGa()
            this.trackPageview()
            Router.router.events.on('routeChangeComplete', this.trackPageview)
        }

        componentWillUnmount = () => {
            Router.router.events.off('routeChangeComplete', this.trackPageview)
        }

        trackPageview = (path = document.location.pathname) => {
            if(path !== this.lastTrackedPath) {
                ReactGA.pageview(path)
                this.lastTrackedPath = path
            }
        }

        initGa = () => {
            if(!window.GA_INITIALIZED) {
                ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID, { debug })
                window.GA_INITIALIZED = true
            }
        }

        render = () => {
            return (
                <WrappedComponent {...this.props} />
            )
        }

    }
)

export default GAWrapper
