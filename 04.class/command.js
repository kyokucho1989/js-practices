import pkg from "enquirer";

const { Select } = pkg;

class CommandHandler {
  constructor(memoRepository) {
    this.memoRepository = memoRepository;
  }

  async selectItem(doing) {
    let rows = await this.memoRepository.extractAllFirstlineColumns();
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
    const selectedItem = await this.memoRepository.selectRecordById(selectedId);

    return selectedItem;
  }

  async displayDetail() {
    let selectedItem = await this.selectItem("see");
    console.log(selectedItem.content);
  }

  async displayAll() {
    let rows = await this.memoRepository.extractAllFirstlineColumns();
    rows.forEach((item) => {
      console.log(item.firstline);
    });
  }

  async deleteItem() {
    let selectedItem = await this.selectItem("delete");
    return this.memoRepository.deleteRecordById(selectedItem.id);
  }

  async saveItem(memoInstance) {
    await this.memoRepository.insertRecord(memoInstance);
  }
}

export default CommandHandler;
