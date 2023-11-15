import pkg from "enquirer";

const { Select } = pkg;

class CommandHandler {
  constructor(databaseManager) {
    this.databaseManager = databaseManager;
  }

  async databaseSet() {
    await this.databaseManager.run(
      "CREATE TABLE IF NOT EXISTS items (id integer primary key autoincrement,content TEXT NOT NULL, firstline TEXT NOT NULL)"
    );
  }

  async selectItem(doing) {
    let rows = await this.databaseManager.all(
      "SELECT id, firstline FROM items"
    );
    let formattedRows = rows.map((item) => ({
      name: item.id,
      message: item.firstline,
    }));

    const prompt = new Select({
      name: "memo",
      message: `Choose a note you want to ${doing}`,
      choices: formattedRows,
    });

    const selectedId = await prompt.run();
    const selectedItem = await this.databaseManager.get(
      "SELECT * FROM items WHERE rowid = ?",
      [selectedId]
    );

    return selectedItem;
  }

  async displayDetail() {
    let selectedItem = await this.selectItem("see");
    console.log(selectedItem.content);
  }

  async displayAll() {
    let rows = await this.databaseManager.all("SELECT firstline FROM items");
    rows.forEach((item) => {
      console.log(item.firstline);
    });
  }

  async deleteItem() {
    let selectedItem = await this.selectItem("delete");
    return this.databaseManager.get("DELETE FROM items WHERE rowid = ?", [
      selectedItem.id,
    ]);
  }

  async saveItem(memoInstance) {
    await this.databaseManager.run(
      "INSERT INTO items (content, firstline) VALUES (?, ?)",
      [memoInstance.memoContent, memoInstance.firstLine()]
    );
  }
}

export default CommandHandler;
