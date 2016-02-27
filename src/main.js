'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require("electron").ipcMain;

// prevent window being garbage collected
let mainWindow;

function onClosed() {
    mainWindow = null;
}

function createMainWindow() {
    const win = new BrowserWindow({
        frame: false,
        height: 395,
        width: 650,
        'min-width': 650,
        'min-height': 395
    });

    win.loadURL('file://' + __dirname + '/index.html');

    win.on('closed', onClosed);
    return win;
}

ipc.on('close-main-window', function () {
    mainWindow.close();
});
ipc.on('minimize-main-window', function () {
    mainWindow.minimize();
});
ipc.on('maximize-main-window', function () {
    mainWindow.maximize();
});

app.on('activate', () => {
    if (!mainWindow) {
        mainWindow = createMainWindow();
    }
});

app.on('ready', () => {
    mainWindow = createMainWindow();
});

app.on('window-all-closed', function() {
   if (process.platform !== 'darwin') {
       app.quit();
   }
});
