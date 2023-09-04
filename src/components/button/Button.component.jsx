import './Button.styles.scss'

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button = ({ children, buttonType, ...btnOptions }) => {
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...btnOptions}
        >
            {children}
        </button>
    )
}

export default Button