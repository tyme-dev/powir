function getMenuTemplate(server) {
  return [
    {
      label: 'File',
      submenu: [
        {
          label: 'Main Website',
          click: async () => {
            await openLink('https://powir.slapbot.me')
          },
        },
        {
          label: 'Author',
          click: async () => {
            server.showAuthorPage()
          },
        },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'Actions',
      submenu: [
        {
          label: 'Export JSON',
          click: async () => {
            server.exportJSONData()
          },
        },
        {
          label: 'Export PDF',
          click: async () => {
            server.exportPDFReport()
          },
        },
        { type: 'separator' },
        {
          label: 'Display Original Report',
          click: async () => {
            server.showOriginalReport()
          },
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      label: 'Tools',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'toggledevtools' },
      ],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Issues/Bugs',
          click: async () => {
            await server.openLink('https://github.com/tyme-dev/powir/issues')
          },
        },
      ],
    },
  ]
}

export { getMenuTemplate }
