const express = require("express");
const app = express();
const PORT = 5000;
const pool = require("./db");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello express");
})

// ユーザー情報を全て取得するAPI
app.get("/users", (req, res) => {
  // 接続情報インポート,クエリでSQL開始するメソッド 第二引数にコールバック関数
  pool.query("SELECT * FROM users;", (error, results) => {
    if (error) throw error;
    return res.status(200).json(results.rows); // ブラウザでrowsは見やすくなる
  });
});

// 特定のユーザーを取得する
app.get("/users/:id", (req, res) => {
  const id = req.params.id; 
/* 解説____________________________________________________________________
req.paramsはreq は request（リクエスト）です。
Expressでは、クライアントから送られてきたリクエスト情報が req に入っています。
その中に、paramsがある。
URLパラメータをまとめて持っているオブジェクトのこと
____________________________________________________________________ */
  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    // WHERE id = $1 は[id],のこと、PostgreSQL（および pg）で使われるパラメータプレースホルダーの記法
    // WHERE id = $1 AND name = $2で[10, "Tanaka"],を含める
    if (error) throw error;
    return res.status(200).json(results.rows); // ブラウザでrowsは見やすくなる
  });
});

// ユーザーを追加する
app.post("/users", (req, res) => {
// メールで重複しているユーザーがあればエラーにする
  const {name, email, age} = req.body; // 分割代入の方法で宣言
  // ユーザー確認
  pool.query("SELECT s FROM users s WHERE s.email = $1", [email], (error, results) => {
    if (results.rows.length) {
      return res.send("すでにユーザーが存在しています"); // リターンがないとinsertされることに注意
    }

// VALUESで実際の値を追加する
    pool.query("INSERT INTO users (name, email, age) VALUES ($1, $2, $3)", [
      name,
      email,
      age,
    ], (error, results) => {
      if (error) throw error;
      res.status(201).send("ユーザー作成に成功しました");
    });
  });
});

// ユーザーを削除するAPI
app.delete("/users/:id", (req, res) => {
  const id = req.params.id; 

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) throw error;

    const isUserExised = results.rows.length;
    if (!isUserExised) {
      return res.send("ユーザーが存在しません");
    }

    pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) throw error;
    return res.status(200).send("削除に成功しました");
  });
  });

});

// ユーザーを更新する
app.put("/users/:id", (req, res) => {
  const id = req.params.id; // URLからidを取得
  const name = req.body.name; // 名前のみ取得する

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => { // 存在チェック
    if (error) throw error;

    const isUserExised = results.rows.length;
    if (!isUserExised) {
      return res.send("ユーザーが存在しません");
    }

// 更新する
    pool.query("UPDATE users SET name = $1 WHERE id = $2", [name ,id], (error, results) => {
      if (error) throw error;
      return res.status(200).send("更新に成功しました");
    });
  });

});

app.listen(PORT, () => {
  console.log(`server is running PORT ${PORT}`);
});
