const { app, BrowserWindow, screen, ipcMain } = require('electron')
const contextMenu = require('electron-context-menu')
const path = require('path')
const { default: installExtension } = require('electron-devtools-installer')

const isDevelopment = process.env.NODE_ENV === 'development'
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
const disposeContextMenu = contextMenu({ showInspectElement: true })

ipcMain.handle('env', () => {
  return {
    key: process.env.APCA_API_KEY_ID,
    secret: process.env.APCA_API_SECRET_KEY,
  }
})

async function createWindow() {
  let win

  if (isDevelopment) {
    await installExtension({
      id: 'nhdogjmejiglipccpnnnanhbledajbpd',
      electron: '>=1.2.1',
    })
    const primaryDisplay = screen.getPrimaryDisplay()

    win = new BrowserWindow({
      width: primaryDisplay.workAreaSize.width / 2,
      height: primaryDisplay.workAreaSize.height,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.resolve(__dirname, 'preload.cjs'),
      },
      y: 23,
      x: primaryDisplay.workAreaSize.width / 2,
    })
    await win.loadURL('http://localhost:3000')
    win.webContents.openDevTools({
      mode: 'bottom',
    })
  } else {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.resolve(__dirname, 'preload.cjs'),
      },
    })
    await win.loadURL(
      `file://${path.join(__dirname, './main/__ui/index.html')}`,
    )
  }
}

app.whenReady().then(async () => {
  await createWindow()

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    disposeContextMenu()
    app.quit()
  }
})
