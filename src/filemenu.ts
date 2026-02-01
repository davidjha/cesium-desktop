import { Menu, BrowserWindow, MenuItemConstructorOptions } from 'electron';

const createMenu = (mainWindow: BrowserWindow) => {
  const template: MenuItemConstructorOptions[] = [
    {
      label: 'File',
      submenu: [
        { 
          role: 'quit'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }, 
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { role: 'close' } 
      ]
    },
    {
      label: 'Help',
      submenu: [
        { role: 'about' },
      ]
    },
    {
      label: 'DataSource',
      submenu: [
        { label: 'Open CZML File',
            click: () => {
                mainWindow.webContents.send('trigger-file-picker');
            }
        },
      ]
    }
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};

export default createMenu;