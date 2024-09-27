import { useState } from 'react'
import GetComponent from '../GetComponent'

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
  commandsContainer: {
    marginTop: '5px'
  }
}

export default function App({ data, global }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div style={styles.groupContainer}>
      <button style={styles.groupNameButton} onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? '-' : '+'} {data.name}
      </button>
      {isExpanded && (
        <div style={styles.commandsContainer}>
          {data.components.map((item) => {
            item.parent = data
            return <GetComponent key={item.name} data={item} global={global} />
          })}
        </div>
      )}
    </div>
  )
}