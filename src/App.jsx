import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      hello
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}
