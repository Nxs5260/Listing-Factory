const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('alf', {
  stateLoad: () => ipcRenderer.invoke('state:load'),
  stateSave: (s) => ipcRenderer.invoke('state:save', s),
  dataInfo: () => ipcRenderer.invoke('data:info'),
  dataChooseDir: () => ipcRenderer.invoke('data:chooseDir'),
  keyStatus: () => ipcRenderer.invoke('key:status'),
  keySet: (p, v) => ipcRenderer.invoke('key:set', { provider: p, value: v }),
  keyClear: (p) => ipcRenderer.invoke('key:clear', { provider: p }),
  gatewayStatus: () => ipcRenderer.invoke('gateway:status'),
  gatewayPriceCatalog: () => ipcRenderer.invoke('gateway:priceCatalog'),
  gatewayGenerate: (req) => ipcRenderer.invoke('gateway:generate', req),
})
