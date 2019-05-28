import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TextInput.scss'

class TextInput extends Component {

    static propTypes = {
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        type: PropTypes.string,
        disabled: PropTypes.bool,
        error: PropTypes.string,
        validate: PropTypes.func
    }

    state = {
        pristine: true
    }

    handleChange = (value) => {
        const { onChange, disabled, validate } = this.props
        const { pristine } = this.state

        if(disabled) return false
        if(pristine) this.setState({pristine: false})

        onChange(value)

        if(validate) validate(value)
    }

    handleBlur = () => {
        const { value, validate } = this.props
        const { pristine } = this.state

        if(validate && !pristine) validate(value)
    }

    render = () => {
        const { value, type, placeholder, disabled, error } = this.props

        return (
            <div className="text-input">

                <input
                    type={type || 'text'}
                    value={value}
                    onChange={e => this.handleChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={!!disabled}
                    onBlur={this.handleBlur}
                />

                {error && <div className="error">{error}</div>}

            </div>
        )
    }

}

export default TextInput
