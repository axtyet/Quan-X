const utils = require("./utils");

module.exports = {
  file: "assets/database.db",
  history: {
    create(db) {
      db.update(`CREATE TABLE IF NOT EXISTS history (
        id INTEGER,
        favorite INTEGER,
        remarks TEXT,
        name TEXT,
        director TEXT,
        actor TEXT,
        year TEXT,
        type TEXT,
        pic TEXT,
        info TEXT,
        play TEXT,
        down TEXT,
        label TEXT,
        url TEXT,
        opening INTEGER,
        ending INTEGER,
        schedule TEXT
      )`);
    },
    insert(data) {
      const db = $sqlite.open(module.exports.file);
      this.create(db);
      this.remove(data.id);
      db.update({
        sql: `INSERT INTO history (id, favorite, remarks, name, director, actor, year, type, pic, info, play, down, label, url, opening, ending, schedule) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        args: [data.id, data.favorite, data.remarks, data.name, data.director, data.actor, data.year, data.type, data.pic, data.info, JSON.stringify(data.play), JSON.stringify(data.down), data.label, data.url, data.opening, data.ending, JSON.stringify(data.schedule)]
      });
      db.commit();
      db.close();
    },
    remove(id) {
      const db = $sqlite.open(module.exports.file);
      db.update({
        sql: `DELETE FROM history WHERE id = ?`,
        args: [id]
      });
      db.commit();
      db.close();
    },
    query() {
      let data = [];
      const db = $sqlite.open(module.exports.file);
      this.create(db);
      module.exports.oldDataMigration();
      db.query(`SELECT * FROM history ORDER BY ROWID DESC`, (rs, err) => {
        while (rs.next()) {
          data.push(Object.assign(rs.values, {
            play: JSON.parse(rs.get("play")),
            down: JSON.parse(rs.get("down")),
            schedule: JSON.parse(rs.get("schedule"))
          }));
        }
        rs.close();
      });
      return data;
    }
  },
  favorites: {
    create(db) {
      db.update(`CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER,
        favorite INTEGER,
        remarks TEXT,
        name TEXT,
        director TEXT,
        actor TEXT,
        year TEXT,
        type TEXT,
        pic TEXT,
        info TEXT,
        play TEXT,
        down TEXT
      )`);
    },
    insert(data) {
      const db = $sqlite.open(module.exports.file);
      this.create(db);
      this.remove(data.id);
      db.update({
        sql: `INSERT INTO favorites (id, favorite, remarks, name, director, actor, year, type, pic, info, play, down) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
        args: [data.id, data.favorite, data.remarks, data.name, data.director, data.actor, data.year, data.type, data.pic, data.info, JSON.stringify(data.play), JSON.stringify(data.down)]
      });
      db.commit();
      db.close();
    },
    remove(id) {
      const db = $sqlite.open(module.exports.file);
      db.update({
        sql: `DELETE FROM favorites WHERE id = ?`,
        args: [id]
      });
      db.commit();
      db.close();
    },
    query() {
      let data = [];
      const db = $sqlite.open(module.exports.file);
      this.create(db);
      db.query(`SELECT * FROM favorites ORDER BY ROWID DESC`, (rs, err) => {
        while (rs.next()) {
          data.push(Object.assign(rs.values, {
            play: JSON.parse(rs.get("play")),
            down: JSON.parse(rs.get("down"))
          }));
        }
        rs.close();
      });
      return data;
    }
  },
  search: {
    create(db) {
      db.update(`CREATE TABLE IF NOT EXISTS search (label TEXT)`);
    },
    insert(text) {
      if (!text) return;
      const db = $sqlite.open(module.exports.file);
      this.create(db);
      this.remove(text);
      db.update({
        sql: "INSERT INTO search (label) VALUES (?)",
        args: [text]
      });
      db.commit();
      db.close();
    },
    remove(text) {
      const db = $sqlite.open(module.exports.file);
      text ? db.update({
        sql: "DELETE FROM search WHERE label = ?",
        args: [text]
      }) : db.update({
        sql: "DELETE FROM search"
      });
      db.commit();
      db.close();
    },
    query() {
      let hist = [];
      const db = $sqlite.open(module.exports.file);
      this.create(db);
      db.query("SELECT * FROM search ORDER BY ROWID DESC", (rs, err) => {
        while (rs.next()) {
          hist.push(rs.values);
        }
        rs.close();
      });
      return hist;
    }
  },
  backup() {
    const folder = "\u5f71\u89c6\u5927\u5168";
    const file = "/database.db";
    if (!$drive.exists(folder)) $drive.mkdir(folder);
    $file.write({
      data: $file.read("assets" + file),
      path: "drive://" + folder + "/" + utils.getNowDate() + ".db"
    });
  },
  restore(name) {
    const path = "\u5f71\u89c6\u5927\u5168/" + name;
    $ui.alert({
      title: "\u6062\u590d\u6570\u636e",
      message: "\u8981\u4f7f\u7528 “" + name + "” \u8986\u76d6\u672c\u5730\u6570\u636e\u5417？",
      actions: [{
        title: "\u662f\u7684",
        style: 0,
        handler: () => {
          if ($drive.exists(path)) $file.write({
            data: $drive.read(path),
            path: "assets/database.db"
          });
          $delay(0.4, () => $addin.restart());
        }
      },
      {
        title: "\u53d6\u6d88",
        style: 1
      }]
    });
  },
  oldDataMigration() {
    const playHistory = $cache.get("playHistory");
    const searchHistory = $cache.get("searchHistory");
    if (playHistory) playHistory.forEach(item => {
      if (item.favorite === undefined) item.favorite = 0;
      this.history.insert(item);
    });
    if (searchHistory) searchHistory.forEach(item => this.search.insert(item.label.text));
    $cache.remove("playHistory");
    $cache.remove("searchHistory");
  }
};











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
