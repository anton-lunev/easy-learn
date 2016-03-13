'use strict';

class WindowControlsController {
    constructor() {
        this.ipc = require('electron').ipcRenderer;
    }

    close() {
        this.ipc.send('close-main-window');
    }

    minimize() {
        this.ipc.send('minimize-main-window');
    }

    fullScreen() {
        this.ipc.send('maximize-main-window');
    }
}

export default WindowControlsController;
