import { useState } from 'react'

import SignupFormDemo from './components/signup-form-demo'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signin from './components/sign-in';
import Appbar  from './components/appbar';
import TransactionHistory from './components/Transaction-history';
import Home from './components/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <SignupFormDemo/> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
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
