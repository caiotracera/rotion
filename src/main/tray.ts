import { BrowserWindow, Menu, Tray, app, nativeImage } from 'electron';
import path from 'node:path';

export function createTray(window: BrowserWindow) {
  const icon = nativeImage.createFromPath(
    path.join(__dirname, '../../resources/rotionTemplate.png'),
  );

  const tray = new Tray(icon);

  const menu = Menu.buildFromTemplate([
    {
      label: 'Rotion',
      enabled: false,
    },
    {
      type: 'separator',
    },
    {
      label: 'Criar novo documento',
      click: () => {
        window.webContents.send('new-document');
      },
    },
    {
      label: 'Documentos recentes',
      enabled: false,
    },
    {
      label: 'Discover',
      accelerator: 'CmdOrCtrl+1',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'Ignite',
      accelerator: 'CmdOrCtrl+2',
      acceleratorWorksWhenHidden: false,
    },
    {
      label: 'Rocketseat',
      accelerator: 'CmdOrCtrl+3',
      acceleratorWorksWhenHidden: false,
    },
    {
      type: 'separator',
    },
    {
      label: 'Sair',
      role: 'quit',
    },
  ]);

  tray.setContextMenu(menu);
}
