export { run, get };

function run(db, SQL, params = []) {
  return new Promise(function (resolve, reject) {
    db.run(SQL, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

function get(db, SQL, params = []) {
  return new Promise(function (resolve, reject) {
    db.get(SQL, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
