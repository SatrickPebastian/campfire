const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const axios = require('axios');

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('save-robot', (event, config) => {
    console.log("Test")
    axios
      .post('http://messaging-system:3001/api/robots/', config)
      .then(() => {
        event.sender.send('config-saved');
      })
      .catch((error) => {
        console.error('Error saving configuration:', error);
        event.sender.send('config-error');
      });
  });
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})