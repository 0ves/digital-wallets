import { useState } from 'react'
import Signup from './signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>hello</div>
      <Signup/>
      {/* <browserRouter>
      <Routes>

        <Route path="/signup" element={<signup/>}/>
        <Route path="/signin" elemen={<signin/>}/>
        <Route path="/dashboard" element={<dashboard/>}/>
        <Route path="/send" element={<sendMoney/>}/>
      </Routes>
      </browserRouter>
             */}

    </>
  )
}

export default App
