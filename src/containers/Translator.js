import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import client from 'feathers'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'
// import {translate} from '../functions/translate'


const Wrapper = styled.div`
  background: steelblue;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`

const Content = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
`

const Title = styled.h1`
`

const Status = styled.div`
  margin-top: 50px;
  color: white;
`

const Translator = props => {
  const [word, setWord] = useState('')
  const [code, setCode] = useState('')
 
  return (
    <Wrapper>
      <Content>
        <Title>Morse Code Translator</Title>
        <Input
          placeholder='Input here to translate to Morse Code'
          value={word}
          onChange={setWord}
        />
        <Button
          text='Translate'
        // onClick={() => axios.get('http://localhost:3000/led/on')}
        onClick={() => axios.get(`/buzz/${word}`).then(res => setCode(res.data))}
        />
        <Status> Translating {code} </Status>
      </Content>
    </Wrapper>
  )
}

export default Translator