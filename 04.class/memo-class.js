class Memo {
  constructor(content) {
    this.memoContent = content;
  }

  get memo() {
    return this.memoContent;
  }

  firstLine() {
    return this.memoContent.split("\n")[0];
  }
}

export default Memo;
