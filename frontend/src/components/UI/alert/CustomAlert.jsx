import { Collapse, Alert, AlertTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React from 'react'
import { useState } from 'react'

export const CustomAlert = ({severity, title, text}) => {
  const [open, setOpen] = useState(true)
  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <AlertTitle>{title}</AlertTitle>
        {text}
      </Alert>
    </Collapse>
  )
}
