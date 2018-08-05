const fs = require('fs');

function analyticLogger(req, res, next) {
  const url = req.originalUrl;
  const method = req.method;
  const newEntry = makeTimeStamp(new Date());
  const date = new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate();
  const data = `${method} ${url} ${makeTimeStamp(new Date())}
  `
  let logEntry;

  fs.readdir('logs', (err, files) => {
    if (err) {
      console.log(err);
    } else {
      const matchingFile = files.findIndex(file => file.startsWith(date));
      (matchingFile > -1) ? logEntry = `logs/${files[matchingFile]}` : logEntry = `logs/${newEntry}`;

      fs.appendFile(logEntry, data, err => err ? console.log(err) : null);
    }
  });
  next();
};

module.exports = {
  analyticLogger,
}

function makeTimeStamp(date) {
  return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
}