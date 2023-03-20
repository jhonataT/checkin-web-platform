import './styles.css';

export const DefaultButton = ({ type = 'primary', label, onPress, disabled }) => {
    return <div className={"button__container " + type + ` ${disabled ? ' disabled' : ''}`} onClick={onPress}>
        {label}
    </div>
}