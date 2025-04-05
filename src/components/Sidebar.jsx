import React, { useState, useEffect } from 'react'
import SidebarRow from './sub-components/SidebarRow'
import openExternalLink from './utils/openExternalLink'
import { defaults, Chart } from 'chart.js'

function Sidebar(props) {
  const [sidebarRows, setSideBarRows] = useState([
    {
      index: 0,
      name: 'Information',
      rootClass: 'mt-3',
      liClass: 'mb-3',
      spanClass: 'border border-primary p-1',
    },

    {
      index: 1,
      name: 'About',
      rootClass: '',
      liClass: '',
      spanClass: '',
    },
    {
      index: 2,
      name: 'Actions',
      rootClass: '',
      liClass: '',
      spanClass: '',
    },
    {
      index: 3,
      name: 'Links',
      rootClass: '',
      liClass: '',
      spanClass: '',
    },
  ])
  //   const [color, setColor] = useState(['white'])

  //   function changeCholor() {
  //     const top = document.getElementsByClassName('dark')[0]
  //     top.className = 'light'
  //     top.style.backgroundColor = 'white'
  //     Chart.defaults.color = 'black'
  //     setColor('black')
  //   }

  function notifyBody(sidebarIndex) {
    setSideBarRows(
      sidebarRows.map((item, index) => {
        if (index === sidebarIndex) {
          return {
            ...item,
            liClass: 'mt-2 mb-2',
            spanClass: 'border border-primary p-1',
          }
        }
        return { ...item, liClass: '', spanClass: '' }
      })
    )
    props.notifyContentWindow(sidebarIndex)
  }

  return (
    <div className='fixed'>
      <ul>
        {sidebarRows.map((item) => (
          <SidebarRow key={item.index} value={item} notifyBody={notifyBody} />
        ))}
      </ul>
      <div className='border-top mt-2'>
        <p>Made With</p>
        <img
          className='no-border'
          src='assets/images/like--v1.png'
          alt='heart'
        />
        <p>
          By{' '}
          <button
            className='clean-button underline'
            onClick={() => openExternalLink('https://slapbot.me')}
          >
            Slapbot
          </button>
        </p>
        <p className='text-xs'>100 % open source</p>
        {/* <p className='text-2xl sidebar-footnote'>
          <button
            className='clean-button underline'
            onClick={() => changeCholor()}
          >
            Change Mode
          </button>
        </p> */}
      </div>
    </div>
  )
}

export default Sidebar
