'use strict';

/**
 * Window controls
 */
class WindowControlsController {
    /**
     * @constructor
     */
    constructor() {
        this.ipc = require('electron').ipcRenderer;
    }

    /**
     * Close window
     */
    close() {
        this.ipc.send('close-main-window');
    }

    /**
     * Minimize window
     */
    minimize() {
        this.ipc.send('minimize-main-window');
    }

    /**
     * Make fullscreen window
     */
    fullScreen() {
        this.ipc.send('maximize-main-window');
    }
}

export default WindowControlsController;
