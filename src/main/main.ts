import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,       // Отключаем Node.js интеграцию в рендерере
      contextIsolation: true,       // Включаем изоляцию контекста
    }
  });

  const url = `file://${path.join(__dirname, '../renderer/index.html')}`;
  mainWindow.loadURL(url);

  // Открываем DevTools, если не в продакшене
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null!;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // На MacOS приложения обычно остаются активными до тех пор, пока пользователь не выйдет явно
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // На MacOS повторно создаем окно, когда иконка приложения нажата, и нет открытых окон
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});