import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SurveyForm from './SurveyForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SurveyForm/>
    </>
  )
}

export default App
