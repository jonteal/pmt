import React from 'react'
import { useState } from 'react';

import './button.css';

const Button = ({ type, children }) => {
  const [color, setColor] = useState('')

  if (type === 'add') {
    setColor('green');
  } else if (type === 'delete') {
    setColor('red');
  }

  return (
    <button className={`${color} btn-component`}>
      {children}
    </button>
  )
}

export default Button;