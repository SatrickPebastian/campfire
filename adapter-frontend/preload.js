const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  saveRobot: (robot) => ipcRenderer.send('save-robot', robot)
})