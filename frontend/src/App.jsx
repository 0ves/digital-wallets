import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <browserRouter>
      <Routes>

        <Route path="/signup" element={<signup/>}/>
        <Route path="/signin" elemen={<signin/>}/>
        <Route path="/dashboard" element={<dashboard/>}/>
        <Route path="/send" element={<sendMoney/>}/>
      </Routes>
      </browserRouter>
    </>
  )
}

export default App
