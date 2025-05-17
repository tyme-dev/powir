import React, { useState } from 'react'
import ContentWindow from './ContentWindow'
import Sidebar from './Sidebar'
import { sendEvent } from './utils/fetcher'

function Body() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  function notifyContentWindow(index) {
    setCurrentSection(index)
  }
  function setInformationWindow() {
    setCurrentSection(0)
    sendEvent('export-PDF-report', { status: true })
  }
  function toggleDarkMode() {
    var darkMode = !isDarkMode
    const top = document.getElementById('base-html')
    top.className = darkMode ? 'dark' : 'light'
    top.style.backgroundColor = darkMode ? 'black' : 'white'
    setIsDarkMode(darkMode)
  }
  return (
    <div className='flex'>
      <div className='w-full md:w-2/12 lg:w-2/12 xl:w-1/12 hidden md:block custom-border border-right mt-2 ml-2 mr-2'>
        <Sidebar
          notifyContentWindow={notifyContentWindow}
          toggleDarkMode={toggleDarkMode}
          darkMode={isDarkMode}
        />
      </div>
      <div className='w-full md:w-10/12 lg:w-10/12 xl:w-11/12'>
        <ContentWindow
          index={currentSection}
          setInformationWindow={setInformationWindow}
          darkMode={isDarkMode}
        />
      </div>
    </div>
  )
}

export default Body
