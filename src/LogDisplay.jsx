import React, { useEffect, useState, useRef } from 'react'
import { runCommand, getLogPath } from './utils'
const fs = window.require('fs')
const path = window.require('path')

const styles = {
  groupContainer: {
    marginTop: '10px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '10px'
  },
  groupNameButton: {
    cursor: 'pointer',
    userSelect: 'none', // 防止用户选择文本  
    backgroundColor: 'transparent',
    border: 'none',
    padding: '5px',
    fontWeight: 'bold'
  },
  commandButton: {
    backgroundColor: '#f0f0f0',
    border: 'none',
    padding: '8px 16px',
    marginRight: '5px',
    cursor: 'pointer',
    borderRadius: '4px',
    outline: 'none' // 移除点击时的轮廓线  
  },
  commandsContainer: {
    marginTop: '5px'
  }
}

function logPath() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return path.join(getLogPath(), `quick-project-${year}${month}${day}.log`)
}

export default function LogDisplay({ initialLogFilePath }) {
  const [logFilePath, setLogFilePath] = useState(initialLogFilePath)
  const [logContent, setLogContent] = useState('')
  const [lastCheckTime, setLastCheckTime] = useState(0)
  const contentRef = useRef(null)

  useEffect(() => {
    setLogFilePath(initialLogFilePath)
  }, [initialLogFilePath])

  useEffect(() => {
    const checkForUpdates = async () => {
      if (!logFilePath) {
        setLogContent('')
        return
      }
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
    }
    checkForUpdates()
    const intervalId = setInterval(checkForUpdates, 1000)
    return () => clearInterval(intervalId)
  }, [logFilePath, lastCheckTime])

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', position: 'relative', height: '350px', overflow: 'hidden' }}>
      <h3>Log File: {path.basename(logFilePath)}</h3>
      <div style={styles.commandsContainer}>
        <button style={styles.commandButton} onClick={() => {
          if (contentRef.current) {
            contentRef.current.scrollTop = 0
          }
        }}>顶部</button>
        <button style={styles.commandButton} onClick={() => {
          if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight
          }
        }}>底部</button>
        <button style={styles.commandButton} onClick={() => {
          runCommand('explorer /select,' + logFilePath.replace(/\//g, '\\'), null)
        }}>文件管理器中打开</button>
        <button style={styles.commandButton} onClick={() => {
          setLogFilePath(logPath())
        }}>主日志</button>
      </div>
      <pre ref={contentRef} style={{ whiteSpace: 'pre', fontFamily: 'monospace', backgroundColor: '#eee', border: '1px solid #ddd', overflow: 'scroll', maxWidth: '600px', maxHeight: '300px', }}>
        {logContent}
      </pre>
    </div>
  )
}  