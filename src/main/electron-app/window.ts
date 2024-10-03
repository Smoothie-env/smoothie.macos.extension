import { BrowserWindow, app } from 'electron';
import * as path from 'path';

export let mainWindow: BrowserWindow | null = null;

export function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });
    const url = `file://${path.join(__dirname, '../../renderer/index.html')}`;
    mainWindow.loadURL(url);
    if (!app.isPackaged) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}