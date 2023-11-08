import { run, get, all } from "./sqlite-function.js";
import sqlite3 from "sqlite3";
import pkg from "enquirer";

const DB_FILE_NAME = "data";
const db = new sqlite3.Database(DB_FILE_NAME);
const { Select } = pkg;

class DatabaseManager {
  async databaseSet() {
    await run(
      db,
      "CREATE TABLE IF NOT EXISTS items (id integer primary key autoincrement,content TEXT NOT NULL, firstrow TEXT NOT NULL)"
    );
  }

  async selectItem(doing) {
    let rows = await all(db, "SELECT id, firstrow FROM items");
    let formattedRows = rows.map((item) => ({
      name: item.id,
      message: item.firstrow,
    }));

    const prompt = new Select({
      name: "memo",
      message: `Choose a note you want to ${doing}`,
      choices: formattedRows,
    });

    const selectedId = await prompt.run();
    const selectedItem = await get(db, "SELECT * FROM items WHERE rowid = ?", [
      selectedId,
    ]);

    return selectedItem;
  }

  async displayDetail() {
    let selectedItem = await this.selectItem("see");
    console.log(selectedItem.content);
  }

  async deleteItem() {
    let selectedItem = await this.selectItem("delete");
    return get(db, "DELETE FROM items WHERE rowid = ?", [selectedItem.id]);
  }

  async displayAll() {
    let rows = await all(db, "SELECT firstrow FROM items");
    rows.forEach((item) => {
      console.log(item.firstrow);
    });
  }

  async saveItem(memoInstance) {
    await run(db, "INSERT INTO items (content, firstrow) VALUES (?, ?)", [
      memoInstance.memoContent,
      memoInstance.firstRow(),
    ]);
  }
}

export default DatabaseManager;
