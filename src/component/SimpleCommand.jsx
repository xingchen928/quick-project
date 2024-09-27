import { log_info, getCommandLogPath, runCommand } from '../utils'

const styles = {
  commandButton: {
    backgroundColor: '#f0f0f0',
    border: 'none',
    padding: '8px 16px',
    marginRight: '5px',
    cursor: 'pointer',
    borderRadius: '4px',
    outline: 'none' // 移除点击时的轮廓线  
  },
}

export default function App({ data, global }) {
  return (
    <button key={data.name} style={styles.commandButton} onClick={() => {
      log_info(`click button ${data.parent.name} ${data.name}`)
      const filename = getCommandLogPath(data.parent.name, data.name)
      runCommand(data.command, filename)
      global.setLog(filename)
    }}>
      {data.name}
    </button>
  )
}