import React from 'react'
import styled from 'styled-components'
import { themeColor, darkThemeColor } from '../utils/colors'


const StyledButton = styled.button`
  width: 200px;
  background: ${themeColor};
  margin: 10px;
  border-radius: 20px;
  border: 1px solid transparent;
  font-size: 14px;
  padding: 5px 10px;
  -webkit-box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.5);
  box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.5);
  cursor: pointer;
  -webkit-transition: background 1s ease-in-out;
  transition: background 1s ease-in-out;
  color: white;
  
  &:hover {
    background:${darkThemeColor};
  }

  &:focus {
    outline:none;
  }
`

const Button = ({ text, color, hoverColor, round, onClick }) => {
  return (
    <StyledButton color={color} hoverColor={hoverColor} round={round} onClick={onClick}>
      {text}
    </StyledButton>
  )
}

export default Button
