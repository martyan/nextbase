import React from 'react'
import PropTypes from 'prop-types'
import ResponsiveModal from 'react-responsive-modal'
import './Modal.scss'

const Modal = (props) => {
    let className =  'modal'
    if(props.noPadding) className += ' no-padding'
    if(props.menu) className += ' menu'

    return (
        <ResponsiveModal
            open={props.visible}
            onClose={props.onClose ? props.onClose : () => {}}
            classNames={{
                modal: className,
                overlay: props.menu ? 'modal-overlay menu' : 'modal-overlay',
                closeButton: props.whiteClose ? 'modal-close white' : 'modal-close'
            }}
            showCloseIcon={!props.noClose}
            center
        >
            {props.children}
        </ResponsiveModal>
    )
}

Modal.propTypes = {
    visible: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    noPadding: PropTypes.bool,
    noClose: PropTypes.bool,
    menu: PropTypes.bool,
    whiteClose: PropTypes.bool
}

export default Modal
