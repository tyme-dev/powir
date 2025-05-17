import React, { useState } from 'react'
import SidebarRow from './sub-components/SidebarRow'
import { defaults, Chart } from 'chart.js'
import { Classic } from '@theme-toggles/react'
import '@theme-toggles/react/css/Classic.css'

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
      <Classic
        toggled={props.darkMode}
        onToggle={props.toggleDarkMode}
        duration={750}
      />
      <div className='border-top mt-2'>
        <p>Made With</p>
        <img
          className='no-border'
          src='assets/images/like--v1.png'
          alt='heart'
        />
        <p className='text-xs'>100 % open source</p>
        <p className='text-2xl sidebar-footnote'></p>
      </div>
    </div>
  )
}

export default Sidebar
