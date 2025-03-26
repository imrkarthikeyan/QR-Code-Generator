import React from 'react'
import "./css/QrCode.css"
import { createRoot } from 'react-dom/client'
import { QrCode } from './components/QrCode.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QrCode/>
  </React.StrictMode>,
)
