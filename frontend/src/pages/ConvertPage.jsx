import { Button, TextField, Select, InputLabel, MenuItem, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AudioPlayerDOM from '../components/UI/audio/AudioPlayerDOM'
import React, { useState } from 'react'
import { CustomAlert } from '../components/UI/alert/CustomAlert'

import styles from './ConvertPage.module.scss'

export const ConvertPage = () => {
  const [text, setText] = useState('Пример конвертирования')
  const [lang, setLang] = useState('ru')
  const [speed, setSpeed] = useState(1.0)
  const [voice, setVoice] = useState('Voice1')
  const [audios, setAudios] = useState([])

  const convert = () => {
    const convertTTS = () => {
      fetch(`${process.env.REACT_APP_API_URL}convert/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "text": { "text": text, "lang": lang, "speed": speed } })
      })
        .then(response => response.json())
        .then(response => setAudios([...audios, response.response.url]))
    }
    convertTTS()
  }

  const removeAudio = (audio) => {
    const index = audios.indexOf(audio)
    let temp = [...audios]
    temp.splice(index, 1)
    setAudios(temp)
  }

  return (
    <div className='convert-container'>
      <CustomAlert
        severity={'warning'}
        title={'Внимание'}
        text={'На данный момент приложение в разработке. Функция изменения голоса недоступна.'}
      />
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
        <div className={styles['convert__customization']}>
          {/* Language */}
          <span>
            <InputLabel id="lang-lb">Язык</InputLabel>
            <Select
              labelId="lang-lb"
              id="lang-select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value={'ru'}>Русский</MenuItem>
              <MenuItem value={'en'}>Английский</MenuItem>
            </Select>
          </span>
          <span>
            {/* Speed */}
            <InputLabel id="speed-lb">Скорость</InputLabel>
            <Select
              labelId="speed-lb"
              id="speed-select"
              value={speed}
              onChange={(e) => setSpeed(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value={1.0}>1.0x</MenuItem>
              <MenuItem value={1.25}>1.25x</MenuItem>
              <MenuItem value={1.5}>1.5x</MenuItem>
              <MenuItem value={2.0}>2.0x</MenuItem>
            </Select></span>
          <span>
            {/* Voice */}
            <InputLabel id="speed-lb">Голос</InputLabel>
            <Select
              labelId="speed-lb"
              id="speed-select"
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value={'Voice1'}>Голос 1</MenuItem>
              <MenuItem value={'Voice2'}>Голос 2</MenuItem>
              <MenuItem value={'Voice3'}>Голос asdfasdfasfdsasf3</MenuItem>
            </Select>
          </span>



        </div>
      </div>
      <Button onClick={convert} variant="contained">
        Преобразовать в речь
      </Button>


      <table>
        <tbody>
          {
            audios.map(audio => (
              <tr key={audio}>
                <td>
                  <AudioPlayerDOM src={`${process.env.REACT_APP_API_URL}${audio}`} />
                </td>
                <td><a href={`${process.env.REACT_APP_API_URL}${audio}`} download>Скачать</a></td>
                <td>
                  <IconButton onClick={() => removeAudio(audio)}><CloseIcon /></IconButton>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
