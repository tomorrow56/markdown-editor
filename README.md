# Markdown Editor

シンプルで使いやすいMarkdownエディタです。Mac用のデスクトップアプリケーションとして動作します。

## 特徴

- 2ペイン構成のインターフェース（左：編集、右：プレビュー）
- リアルタイムプレビュー
- Chromeレンダリングエンジンを使用したMarkdown表示
- ファイル操作機能（開く、保存、名前を付けて保存）
- キーボードショートカット対応

## インストール方法

1. リリースページから最新のDMGファイルをダウンロード
2. DMGファイルを開き、アプリケーションをApplicationsフォルダにドラッグ＆ドロップ
3. Launchpadまたはアプリケーションフォルダから起動

## 使用方法

### 基本操作

- 左ペインでMarkdownテキストを編集
- 右ペインでリアルタイムプレビューを確認
- ファイルメニューからファイル操作（開く、保存、名前を付けて保存）

### キーボードショートカット

- 新規作成: `Cmd + N`
- ファイルを開く: `Cmd + O`
- 保存: `Cmd + S`
- 名前を付けて保存: `Cmd + Shift + S`
- 終了: `Cmd + Q`

## 開発

### 必要条件

- Node.js 14以上
- npm または yarn

### セットアップ

```bash
# リポジトリのクローン
git clone https://github.com/yourusername/markdown-editor.git
cd markdown-editor

# 依存関係のインストール
npm install

# アプリケーションの起動
npm start
```

### ビルド

```bash
# Mac用ビルド
npm run build:mac
```

## ライセンス

MIT

