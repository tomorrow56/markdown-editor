# Mac用Markdownエディタのビルド手順

このドキュメントでは、Mac用Markdownエディタをビルドして実行可能なアプリケーションを作成する手順を説明します。

## 前提条件

- macOS 10.15以降
- Node.js 14以降
- npm または yarn

## ビルド手順

1. プロジェクトディレクトリに移動します。

```bash
cd /path/to/markdown-editor
```

2. 依存関係をインストールします。

```bash
npm install
```

3. アプリケーションをビルドします。

```bash
npm run build:mac
```

ビルドが成功すると、`dist`ディレクトリに以下のファイルが生成されます：

- `Markdown Editor-1.0.0.dmg` - インストーラーDMGファイル
- `Markdown Editor-1.0.0-mac.zip` - ZIPアーカイブ
- `mac` - ビルド中間ファイル

## インストール方法

### DMGからのインストール

1. 生成された`Markdown Editor-1.0.0.dmg`ファイルをダブルクリックして開きます。
2. 表示されるウィンドウで、Markdown Editorアイコンを「Applications」フォルダにドラッグ＆ドロップします。
3. Launchpadまたはアプリケーションフォルダから「Markdown Editor」を起動します。

### ZIPからのインストール

1. 生成された`Markdown Editor-1.0.0-mac.zip`ファイルをダブルクリックして展開します。
2. 展開された「Markdown Editor.app」をアプリケーションフォルダに移動します。
3. Launchpadまたはアプリケーションフォルダから「Markdown Editor」を起動します。

## 開発モードでの実行

ビルドせずに開発モードでアプリケーションを実行するには：

```bash
npm start
```

## トラブルシューティング

### コード署名エラー

macOSのセキュリティ設定により、署名されていないアプリケーションの実行が制限される場合があります。その場合は以下の手順で対応してください：

1. Finderでアプリケーションを右クリックし、「開く」を選択します。
2. 警告ダイアログが表示されたら、「開く」ボタンをクリックします。

### ビルドエラー

ビルド中にエラーが発生した場合は、以下を確認してください：

1. Node.jsとnpmが最新バージョンであることを確認します。
2. 依存関係を再インストールします：
   ```bash
   rm -rf node_modules
   npm install
   ```
3. electron-builderの設定を確認します（package.jsonの`build`セクション）。

