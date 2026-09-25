## メモ

```bash
npm init -y
```
上記はnpm initコマンドを実行することで、作成されるパッケージファイルpackage.jsonは、Node.jsプロジェクトの設定や依存関係を管理するためのJSON形式のファイルである。

```bash
npm i express nodemon pg
```

```bush
npm install dotenv
```

開発時の確認エンドポイント
http://localhost:5000/

dbプールについて

DBプール（コネクションプール）とは、データベースへの接続（コネクション）をあらかじめ複数作成してためておき、アプリケーションからの要求に応じて使い回す仕組み