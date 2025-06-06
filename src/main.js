const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let currentFilePath = null;

function createWindow() {
  // ブラウザウィンドウを作成
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  });

  // index.htmlをロード
  mainWindow.loadFile('index.html');

  // メニューを作成
  createMenu();

  // 開発者ツールを開く（開発時のみ）
  // mainWindow.webContents.openDevTools();

  // ウィンドウが閉じられたときの処理
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// メニューを作成する関数
function createMenu() {
  const template = [
    {
      label: 'ファイル',
      submenu: [
        {
          label: '新規作成',
          accelerator: 'CmdOrCtrl+N',
          click() {
            if (mainWindow) {
              mainWindow.webContents.send('new-file');
              currentFilePath = null;
            }
          }
        },
        {
          label: 'ファイルを開く',
          accelerator: 'CmdOrCtrl+O',
          click() {
            openFile();
          }
        },
        {
          label: '保存',
          accelerator: 'CmdOrCtrl+S',
          click() {
            saveFile();
          }
        },
        {
          label: '名前を付けて保存',
          accelerator: 'CmdOrCtrl+Shift+S',
          click() {
            saveFileAs();
          }
        },
        { type: 'separator' },
        {
          label: '終了',
          accelerator: 'CmdOrCtrl+Q',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: '編集',
      submenu: [
        { role: 'undo', label: '元に戻す' },
        { role: 'redo', label: 'やり直す' },
        { type: 'separator' },
        { role: 'cut', label: '切り取り' },
        { role: 'copy', label: 'コピー' },
        { role: 'paste', label: '貼り付け' },
        { role: 'delete', label: '削除' },
        { type: 'separator' },
        { role: 'selectAll', label: 'すべて選択' }
      ]
    },
    {
      label: '表示',
      submenu: [
        { role: 'reload', label: '再読み込み' },
        { role: 'toggledevtools', label: '開発者ツール' },
        { type: 'separator' },
        { role: 'resetzoom', label: 'ズームをリセット' },
        { role: 'zoomin', label: 'ズームイン' },
        { role: 'zoomout', label: 'ズームアウト' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'フルスクリーン' }
      ]
    },
    {
      role: 'help',
      label: 'ヘルプ',
      submenu: [
        {
          label: 'Markdownエディタについて',
          click() {
            dialog.showMessageBox({
              title: 'Markdownエディタについて',
              message: 'Markdownエディタ v1.0.0',
              detail: 'シンプルなMarkdownエディタです。\n左ペインでテキストを編集し、右ペインでプレビューを確認できます。'
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// ファイルを開く関数
function openFile() {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Markdown', extensions: ['md', 'markdown'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  }).then(result => {
    if (!result.canceled && result.filePaths.length > 0) {
      const filePath = result.filePaths[0];
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          dialog.showErrorBox('エラー', 'ファイルを開けませんでした: ' + err.message);
          return;
        }
        currentFilePath = filePath;
        mainWindow.webContents.send('file-opened', data, filePath);
      });
    }
  }).catch(err => {
    dialog.showErrorBox('エラー', 'ファイルを開けませんでした: ' + err.message);
  });
}

// ファイルを保存する関数
function saveFile() {
  if (currentFilePath) {
    mainWindow.webContents.send('save-file');
  } else {
    saveFileAs();
  }
}

// 名前を付けて保存する関数
function saveFileAs() {
  mainWindow.webContents.send('save-file-as');
}

// IPC通信の設定
ipcMain.on('save-file-content', (event, content) => {
  if (currentFilePath) {
    fs.writeFile(currentFilePath, content, (err) => {
      if (err) {
        dialog.showErrorBox('エラー', 'ファイルを保存できませんでした: ' + err.message);
        return;
      }
      mainWindow.webContents.send('file-saved', currentFilePath);
    });
  }
});

ipcMain.on('save-file-as-content', (event, content) => {
  dialog.showSaveDialog(mainWindow, {
    filters: [
      { name: 'Markdown', extensions: ['md', 'markdown'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  }).then(result => {
    if (!result.canceled && result.filePath) {
      const filePath = result.filePath;
      fs.writeFile(filePath, content, (err) => {
        if (err) {
          dialog.showErrorBox('エラー', 'ファイルを保存できませんでした: ' + err.message);
          return;
        }
        currentFilePath = filePath;
        mainWindow.webContents.send('file-saved', filePath);
      });
    }
  }).catch(err => {
    dialog.showErrorBox('エラー', 'ファイルを保存できませんでした: ' + err.message);
  });
});

// アプリケーションの準備ができたら実行
app.whenReady().then(createWindow);

// すべてのウィンドウが閉じられたときの処理（macOSを除く）
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// アプリケーションがアクティブになったときの処理（macOS）
app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

