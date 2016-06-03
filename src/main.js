'use strict';
/* eslint-env node */
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const Menu = electron.menu;

// prevent window being garbage collected
let mainWindow;

/**
 * Create application main window
 * @returns {object} window
 */
function createMainWindow() {
    const win = new BrowserWindow({
        'frame': false,
        'height': 395,
        'width': 680,
        'minWidth': 680,
        'minHeight': 395
    });

    if (process.env['NODE_ENV'] !== 'dev') {
        win.loadURL(`file://${__dirname}/index.html`);
    } else {
        win.loadURL('http://localhost:8080/');
    }

    win.on('closed', () => {
        mainWindow = null;
    });
    return win;
}

/**
 * Set application menu in production mode
 */
function setApplicationMenu() {
    const template = [
        {
            label: 'Application',
            submenu: [
                {label: 'About Application', selector: 'orderFrontStandardAboutPanel:'},
                {type: 'separator'},
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click() {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:'},
                {label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:'},
                {type: 'separator'},
                {label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:'},
                {label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:'},
                {label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:'},
                {label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:'}
            ]
        }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

ipc.on('close-main-window', () => {
    mainWindow.close();
});
ipc.on('minimize-main-window', () => {
    mainWindow.minimize();
});
ipc.on('maximize-main-window', () => {
    mainWindow.maximize();
});

app.on('activate', () => {
    if (!mainWindow) {
        mainWindow = createMainWindow();
    }
});

app.on('ready', () => {
    mainWindow = createMainWindow();
    if (process.env['NODE_ENV'] !== 'dev') {
        setApplicationMenu();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
