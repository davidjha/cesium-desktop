// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electronAPI', {

    // Request the CZML file picker filepicker.ts
    pickCzmlFile: () => ipcRenderer.invoke('open-czml'),

    onTriggerPicker: (callback: () => void ) => ipcRenderer.on('trigger-file-picker', () => callback())
});