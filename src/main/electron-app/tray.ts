// tray.ts

import { Tray, Menu, nativeImage, app } from 'electron';
import * as path from 'path';
import { createWindow, mainWindow } from './window';

let tray: Tray | null = null;

export function createTray() {
    const iconPath = path.join(__dirname, '../assets/icon.png');
    const trayIcon = nativeImage.createFromPath(iconPath);
    tray = new Tray(trayIcon);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show Window', click: () => {
                if (mainWindow === null) {
                    createWindow();
                } else {
                    mainWindow.show();
                }
            }
        },
        { label: 'Exit', click: () => { app.quit(); } }
    ]);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('My Application');
}