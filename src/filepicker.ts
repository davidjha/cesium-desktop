// src/main/filepicker.ts
import { ipcMain, dialog } from 'electron';
import fs from 'fs/promises';

export function registerFilePickerHandlers() {
  ipcMain.handle('open-czml', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      filters: [{ name: 'Cesium Language', extensions: ['czml', 'json'] }],
      properties: ['openFile']
    });

    if (canceled || filePaths.length === 0) {
      return null;
    }

    try {
      const content = await fs.readFile(filePaths[0], 'utf-8');
      return JSON.parse(content);
    } catch (error) {
      console.error("File Read Error:", error);
      throw error; // This will be caught by your React 'try/catch'
    }
  });
}