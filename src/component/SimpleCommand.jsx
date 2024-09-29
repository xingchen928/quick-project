import { useEffect, useState } from 'react'
import { log_info, getCommandLogPath, runCommand, log_error } from '../utils'
import GetComponent from '../GetComponent'

function StatusDisplay({ status }) {
  let color;
  if (status === '运行成功') {
    color = 'green';
  } else {
    color = 'red';
  }

  return (
    <span style={{ marginRight: '10px', color: color }}>{status}</span>
  );
}

export default function App({ data, global }) {
  const [status, setStatus] = useState('运行成功')
  const [isExpanded, setIsExpanded] = useState(false)
  const [logname, setLogname] = useState()

  useEffect(() => {
    if (data) {
      setLogname(getCommandLogPath(data.parent.name, data.name));
    }
  }, [data]);

  return (
    <>
      <div>
        <span style={{ marginRight: '10px' }}>{data.name}</span>
        <StatusDisplay status={status} />
        <button className="commandButton" onClick={() => {
          log_info(`click button ${data.parent.name} ${data.name}`)
          runCommand(data.command, logname)
            .then(() => {
              setStatus('运行成功')
            })
            .catch(error => {
              setStatus('运行失败')
              log_error('Command failed:', error)
            })
        }}>运行</button>
        <button className="commandButton" onClick={() => {
          setIsExpanded(!isExpanded);
        }}>日志</button>
      </div>
      {isExpanded && <div style={{ marginTop: '10px' }}>
        <GetComponent data={{ logname: logname, template: "LogDisplay" }} global={global} />
      </div>}
    </>
  )
}
