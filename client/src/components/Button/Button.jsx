
import './button.css';

const Button = ({ buttonType, children }) => {
  return (
    <button className={`btn-component ${buttonType}`}>
      {children}
    </button>
  )
}

export default Button;