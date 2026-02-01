// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  pickCzmlFile: () => ipcRenderer.invoke('open-czml'),
  
  onTriggerPicker: (callback: () => void) => {
    // Typing 'event' as IpcRendererEvent and 'args' as any[]
    const subscription = (_event: IpcRendererEvent, ..._args: any[]) => callback();
    
    ipcRenderer.on('trigger-file-picker', subscription);
    
    // Return cleanup function
    return () => {
      ipcRenderer.removeListener('trigger-file-picker', subscription);
    };
  },

  removeListener: (channel: string, callback: (...args: any[]) => void) => {
    ipcRenderer.removeListener(channel, callback);
  }
});