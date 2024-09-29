import React, { useEffect, useState, useRef } from 'react'
import { runCommand, getLogPath } from '../utils'
const fs = window.require('fs')
const path = window.require('path')

function logPath() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return path.join(getLogPath(), `quick-project-${year}${month}${day}.log`)
}

export default function App({ data, global }) {
  const [logFilePath, setLogFilePath] = useState('')
  const [logContent, setLogContent] = useState('')
  const [lastCheckTime, setLastCheckTime] = useState(0)
  const contentRef = useRef(null)

  useEffect(() => {
    setLogFilePath(data.logname)
  }, [data])

  useEffect(() => {
    const checkForUpdates = async () => {
      if (!logFilePath || logFilePath === '') {
        setLogContent('')
        return
      }
      try {
        const stats = await fs.promises.stat(logFilePath)
        const fileModTime = stats.mtimeMs
        if (fileModTime > lastCheckTime) {
          const content = await fs.promises.readFile(logFilePath, 'utf8')
          setLogContent(content + "\n\n\n")
          setLastCheckTime(fileModTime)
          if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight
          }
        }
      } catch (e) {
        setLogContent('')
      }
    }
    checkForUpdates()
    const intervalId = setInterval(checkForUpdates, 1000)
    return () => clearInterval(intervalId)
  }, [logFilePath, lastCheckTime])

  const getBasename = (p) => {
    if (!p || p === '') {
      return ''
    }
    return path.basename(p)
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', position: 'relative', height: '350px', overflow: 'hidden' }}>
      <div>
        <span style={{ marginRight: '10px' }}>Log File: {getBasename(logFilePath)}</span>
        <button className="commandButton" onClick={() => {
          if (contentRef.current) {
            contentRef.current.scrollTop = 0
          }
        }}>顶部</button>
        <button className="commandButton" onClick={() => {
          if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight
          }
        }}>底部</button>
        <button className="commandButton" onClick={() => {
          runCommand('explorer /select,\"' + logFilePath.replace(/\//g, '\\') + "\"")
        }}>文件管理器中打开</button>
        <button className="commandButton" onClick={() => {
          runCommand('code \"' + logFilePath + "\"")
        }}>Code打开</button>
      </div>
      <pre ref={contentRef} style={{ whiteSpace: 'pre', fontFamily: 'monospace', backgroundColor: '#eee', border: '1px solid #ddd', overflow: 'scroll', maxHeight: '300px', margin: '0px', marginTop: '5px' }}>
        {logContent}
      </pre>
    </div>
  )
}  