import { useState } from 'react'
import GetComponent from '../GetComponent'

const styles = {
  groupContainer: {
    marginTop: '10px',
    borderBottom: 'none',
    padding: '10px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0',
    overflow: 'hidden',
  },
  groupNameButton: {
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    padding: '5px',
    fontWeight: 'bold'
  },
  listItemCard: {
    marginTop: '10px',
    padding: '8px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    border: '1px solid #d9d9d9',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
}

export default function App({ data, global }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div style={styles.groupContainer}>
      <button style={styles.groupNameButton} onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? '-' : '+'} {data.name}
      </button>
      {isExpanded && (
        <>
          {data.components.map((item) => {
            item.parent = data
            return (
              <div key={item.name} style={styles.listItemCard}>
                <GetComponent data={item} global={global} />
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}