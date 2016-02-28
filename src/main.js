'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var ipc = require("electron").ipcMain;
var Menu = require("menu");

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

function setApplicationMenu() {
    let template = [
        {
            label: "Application",
            submenu: [
                {label: "About Application", selector: "orderFrontStandardAboutPanel:"},
                {type: "separator"},
                {
                    label: "Quit", accelerator: "Command+Q", click: function () {
                    app.quit();
                }
                }
            ]
        },
        {
            label: "Edit",
            submenu: [
                {label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:"},
                {label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"},
                {type: "separator"},
                {label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"},
                {label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"},
                {label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"},
                {label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:"}
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
    console.log(process.env['NODE_ENV']);
    if (process.env['NODE_ENV'] != 'dev') {
        setApplicationMenu();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
