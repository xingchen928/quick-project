const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

export function getWorkspacePath() {
  return 'D:/workspace'
}

export function getLogPath() {
  return path.join(getWorkspacePath(), "logs")
}

export function log_line(msg) {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const filename = path.join(getLogPath(), `quick-project-${year}${month}${day}.log`)
  fs.appendFileSync(filename, `${year}-${month}-${day} ${hours}-${minutes}-${seconds} ${msg}\n`)
}

export function log_info(msg) {
  log_line(`[info] ${msg}`)
}

export function log_exec(msg) {
  log_line(`[exec] ${msg}`)
}

export function log_error(msg) {
  log_line(`[error] ${msg}`)
}

function execAsync(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}


export async function runCommand(command, filename) {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  log_exec(command)

  if (!filename) {
    await execAsync(command)
    return
  } else {
    fs.appendFileSync(filename, `\n\n\n${year}-${month}-${day} ${hours}-${minutes}-${seconds} ${command}\n`)
    await execAsync(command + ` 2>&1 >> "${filename}"`)
  }
}

// 清理七天前的日志  
export function cleanOldLogs() {
  const logDir = getLogPath()
  const now = new Date()
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000)
  fs.readdirSync(logDir, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .forEach(dirent => {
      const filePath = path.join(logDir, dirent.name)
      const stats = fs.statSync(filePath)
      if (stats.mtime < sevenDaysAgo) {
        fs.unlinkSync(filePath)
      }
    })
}

export function getCommandLogPath(groupId, commandId) {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return path.join(getLogPath(), `${groupId}-${commandId}-${year}${month}${day}.log`)
}  
