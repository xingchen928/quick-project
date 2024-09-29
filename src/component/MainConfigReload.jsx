export default function App({ data, global }) {
  return (
    <button className="commandButton" onClick={() => {
      global.reload()
    }}>加载配置</button>
  )
}