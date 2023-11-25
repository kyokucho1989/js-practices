class MemoRepository {
  constructor(databaseManager) {
    this.databaseManager = databaseManager;
  }

  async initializeDatabase() {
    await this.databaseManager.run(
      "CREATE TABLE IF NOT EXISTS items (id integer primary key autoincrement,content TEXT NOT NULL, firstline TEXT NOT NULL)"
    );
  }

  async extractAllFirstlineColumns() {
    return await this.databaseManager.all("SELECT id, firstline FROM items");
  }
  async selectRecordById(id) {
    return await this.databaseManager.get(
      "SELECT * FROM items WHERE rowid = ?",
      [id]
    );
  }

  async insertRecord(memoInstance) {
    return await this.databaseManager.run(
      "INSERT INTO items (content, firstline) VALUES (?, ?)",
      [memoInstance.memoContent, memoInstance.firstLine()]
    );
  }
  deleteRecordById(id) {
    return this.databaseManager.get("DELETE FROM items WHERE rowid = ?", [id]);
  }
}

export default MemoRepository;
