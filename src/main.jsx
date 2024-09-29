import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState, useEffect } from 'react'
import { cleanOldLogs, getWorkspacePath } from './utils'
import GetComponent from './GetComponent'
const path = require('path')
const fs = require('fs')
import './main.css';

function App() {
  const [config, setConfig] = useState()

  const reload = () => {
    cleanOldLogs()
    const c = JSON.parse(fs.readFileSync(path.join(getWorkspacePath(), "workspace.json"), 'utf8'))
    c.parent = null
    setConfig(c)
  }

  useEffect(() => {
    reload()
  }, [])

  return (
    <GetComponent
      data={config}
      global={{
        reload
      }} />
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
