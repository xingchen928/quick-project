import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState, useEffect } from 'react'
import { cleanOldLogs, getWorkspacePath } from './utils'
import GetComponent from './GetComponent'
const path = require('path')
const fs = require('fs')

function App() {
  const [log, setLog] = useState('')
  const [config, setConfig] = useState(undefined)

  useEffect(() => {
    cleanOldLogs()
    const c = JSON.parse(fs.readFileSync(path.join(getWorkspacePath(), "workspace.json"), 'utf8'))
    c.parent = null
    setConfig(c)
  }, [])

  return (
    <GetComponent
      data={config}
      global={{
        setLog: setLog,
        log: log,
      }} />
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
