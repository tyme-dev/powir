import React from 'react'
import { defaults, Chart } from 'chart.js'
import Navbar from './components/Navbar'
import Body from './components/Body'
import Footer from './components/Footer'

defaults.font.family = 'Neucha'

function App() {
  return (
    <div>
      {/*<Broadcast />*/}
      <Navbar />
      <Body />
      <Footer />
    </div>
  )
}

export default App
