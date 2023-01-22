import { useState } from 'react';

import './button.css';

const Button = ({ type, children }) => {
  const [buttonType, setButtonType] = useState('');

  if (type === 'primary') {
    setButtonType('primary');
  } else if (type === 'secondary') {
    setButtonType('secondary');
  }


  return (
    <button className={`btn-component ${buttonType}`}>
      {children}
    </button>
  )
}

export default Button;