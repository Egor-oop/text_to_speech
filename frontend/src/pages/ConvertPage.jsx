import Box from '@mui/material/Box'
import { Button, TextField, Select, InputLabel, MenuItem } from '@mui/material'
import AudioPlayerDOM from '../components/UI/audio/AudioPlayerDOM'
import React, { useState } from 'react'

export const ConvertPage = () => {
  const [text, setText] = useState('')
  const [lang, setLang] = useState('')
  const [response, setResponse] = useState({})

  const convert = () => {
    fetch('http://127.0.0.1:8000/convert/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "text": { "text": text, "lang": lang } })
    })
      .then(response => response.json())
      .then(response => setResponse(response.response))
  }

  return (
    <div className='convert-container'>
      {
        response['url'] &&
        (
          <AudioPlayerDOM src={`http://127.0.0.1:8000${response['url']}`} />
        )
      }
      <h1>Конвертировать текст в голос</h1>
      <TextField
        id="outlined-textarea"
        label="Текст"
        placeholder="Введите текст"
        multiline
        fullWidth
        margin="normal"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <InputLabel id="lang-lb">Язык</InputLabel>
      <Select
        labelId="lang-lb"
        id="demo-simple-select"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        margin="normal"
      >
        <MenuItem value={'ru'}>Русский</MenuItem>
        <MenuItem value={'en'}>Английский</MenuItem>
      </Select>
      <Button onClick={convert} variant="contained">
        Конвертировать
      </Button>
    </div>
  )
}
