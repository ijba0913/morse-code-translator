import React from 'react'
import styled from 'styled-components'


const StyledInput = styled.input`
  border-radius: 20px;
  border: 0;
  margin: 10px;
  padding: 10px 25px;
  font-size: 20px;
  width: 100%;
  color: black;

  -webkit-box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.5);
  -moz-box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.5);
  box-shadow: 3px 3px 8px 0px rgba(0,0,0,0.5);

  &:focus {
    outline:none;
    /* border: 1px solid red */
  }
`

const Input = ({ placeholder, value, onChange, }) => {
  return (
    <StyledInput
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}

export default Input