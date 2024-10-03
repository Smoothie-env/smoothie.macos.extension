import { app } from 'electron';
import { createWindow, mainWindow } from './electron-app/window';
import { createTray } from './electron-app/tray';

app.whenReady().then(() => {
  createTray();
  // createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});