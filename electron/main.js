import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import { log } from 'electron-log'
import { join } from 'path'
import isDev from 'electron-is-dev'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
import server from '../public/app/server'
import { getMenuTemplate } from '../public/app/menu'

process.env.APP_ROOT = join(__dirname, '..')
const RENDERER_DIST = join(process.env.APP_ROOT, 'dist')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
  })

  win.maximize()
  win.show()
  // and load the index.html of the app.
  if (isDev) {
    win.loadURL('http://localhost:3000').catch((error) => {
      if (error.code === 'ERR_ABORTED') return
      throw error
    })
  } else {
    win.loadFile(join(RENDERER_DIST, 'index.html'))
  }

  // Open the DevTools.
  isDev ? win.webContents.openDevTools() : null
}

const menuTemplate = getMenuTemplate(server)
const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('battery-report-ready', (event, data) => {
  server.sendBatteryReport(event, data)
})

ipcMain.on('show-original-report', (event, data) => {
  server.showOriginalReport()
})

ipcMain.on('export-JSON-data', (event, data) => {
  server.exportJSONData()
})

ipcMain.on('export-PDF-report', (event, data) => {
  server.exportPDFReport()
})

ipcMain.on('get-updates', (event, data) => {
  server.getUpdates(event, data)
})

ipcMain.on('open-link', async (event, data) => {
  server.openLink(data.url).catch((error) => log(error))
})
