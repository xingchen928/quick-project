import LogDisplay from '../LogDisplay'
import GetComponent from '../GetComponent'

export default function App({ data, global }) {
  return (
    <>
      <div style={{ padding: '20px', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>
        {data.components.map((item) => {
          item.parent = data
          return <GetComponent key={item.name} data={item} parent={data} global={global} />
        })}
      </div>
      <LogDisplay initialLogFilePath={global.log} />
    </>
  )
}