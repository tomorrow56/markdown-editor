# Markdown Editor - インストール手順

このZIPファイルには、Mac用Markdownエディタのソースコードが含まれています。
node_modulesディレクトリは含まれていないため、以下の手順でインストールしてください。

## インストール手順

1. ZIPファイルを解凍します。
2. ターミナルを開き、解凍したディレクトリに移動します。
3. 以下のコマンドを実行して、依存関係をインストールします。

```bash
npm install
```

4. インストールが完了したら、以下のコマンドでアプリケーションを起動できます。

```bash
npm start
```

## ビルド手順

Mac用のアプリケーションとしてビルドするには、以下のコマンドを実行します。

```bash
npm run build:mac
```

詳細なビルド手順は `BUILD_INSTRUCTIONS.md` ファイルを参照してください。

## ファイル構成

- `main.js` - Electronのメインプロセス
- `index.html` - アプリケーションのUI
- `package.json` - プロジェクト設定
- `README.md` - プロジェクト説明
- `BUILD_INSTRUCTIONS.md` - ビルド手順
- `TEST_CHECKLIST.md` - テストチェックリスト
- `CODE_REVIEW.md` - コードレビュー結果
- `FINAL_REPORT.md` - 最終報告書

## 注意事項

このアプリケーションはMac用に設計されていますが、Windows/Linuxでも動作する可能性があります。
ただし、一部の機能（メニューバーなど）はプラットフォームによって動作が異なる場合があります。

