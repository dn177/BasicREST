const express = require("express");
require("dotenv").config();
const http = require("http");
var httpProxy = require("http-proxy");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;
const apiPath = process.env.API_PATH;
const db = new sqlite3.Database(
  "./db/fahrzeuge.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.error(err.message);
    console.log("Verbunden mit Fahrzeugdatenbank.");
  }
);

db.serialize(() => {
  const sql =
    "CREATE TABLE IF NOT EXISTS fahrzeuge(name TEXT, license TEXT, color TEXT, tuv TEXT)";
  db.run(sql);

  //
  db.run(
    "INSERT INTO fahrzeuge(name, license, color, tuv) VALUES ('tesla', 'mSFT', 'blau', 'dreißig')"
  );
  db.run(
    "INSERT INTO fahrzeuge(name, license, color, tuv) VALUES ('vw', 'bwls', 'schwarz', 'vierzig')"
  );
});

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("Wilkommen bei der Fahrzeugdatenbank");
});

app.get(`/${apiPath}/getcars`, (req, res) => {
  db.all("SELECT * FROM fahrzeuge", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Interner Server Fehler");
    } else {
      res.send(rows);
      console.log(rows);
    }
  });
});

app.post(`/${apiPath}/addcar`, (req, res) => {
  const { name, kennzeichen, farbe, tuv } = req.body;
  // console.log(name, kennzeichen, farbe, tuv);
  const sql = `INSERT into fahrzeuge(name, license, color, tuv) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, kennzeichen, farbe, tuv], (err) => {
    if (err) return console.error(err.message);
  });
  res.status(200).send("Fahrzeug hinzugefügt.");
});

app.listen(port, () => {
  console.log(`Express server läuft auf Port ${port}...`);
});
