import { useState } from 'react'
import Signup from './signup'
import SignupFormDemo from './components/signup-form-demo'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signin from './components/sign-in';
import Appbar  from './components/appbar';
import TransactionHistory from './components/Transaction-history';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <SignupFormDemo/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/appbar" element={<Appbar/>}/>
          <Route path="/signup" element={<SignupFormDemo/>}/>
          <Route path="/transaction" elelment={<TransactionHistory/>}/>
        </Routes>
      </Router>
            

    </>
  )
}

export default App
