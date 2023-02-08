import { Button, TextField, Select, InputLabel, MenuItem } from '@mui/material'
import AudioPlayerDOM from '../components/UI/audio/AudioPlayerDOM'
import React, { useState } from 'react'
import { CustomAlert } from '../components/UI/alert/CustomAlert'

export const ConvertPage = () => {
  const [text, setText] = useState('')
  const [lang, setLang] = useState('ru')
  const [response, setResponse] = useState({})

  const convert = () => {
    fetch(`${process.env.REACT_APP_API_URL}convert/`, {
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
      <CustomAlert
        severity={'warning'}
        title={'Внимание'}
        text={'На данный момент приложение в разработке. Некоторые функции могут быть недоступны, такие как изменение голоса диктора или изменение скорости голоса.'}
      />
      {
        response['url'] &&
        (
          <AudioPlayerDOM src={`${process.env.REACT_APP_API_URL}${response['url']}`} />
        )
      }
      <h1>Конвертировать текст в голос</h1>
      <div>
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
          sx={{ mb: 2 }}
        >
          <MenuItem value={'ru'}>Русский</MenuItem>
          <MenuItem value={'en'}>Английский</MenuItem>
        </Select>
      </div>
      <Button onClick={convert} variant="contained">
        Преобразовать в речь
      </Button>
    </div>
  )
}
