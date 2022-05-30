// noinspection ES6UnusedImports
const { ipcRenderer, remote } = require('electron') // eslint-disable-line @typescript-eslint/no-unused-vars

/* eslint-disable @typescript-eslint/no-explicit-any */
window.ipcRenderer = ipcRenderer
window.remote = remote
/* eslint-enable */
