export function openElectronLink(url) {
  window.ipcr.send('open-link', { url: url })
}

// Remove async?
export function getElectronEvent(channel, callbackFunction) {
  window.ipcr.on(channel, async (event, data) => {
    callbackFunction(data)
  })
}

export function sendElectronEvent(channel, data) {
  window.ipcr.send(channel, data)
}
