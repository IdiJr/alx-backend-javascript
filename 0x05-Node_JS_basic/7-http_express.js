const express = require('express');
const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(Error('Cannot load the database'));
      // Split data and take only the list without the header
      const lines = data.split('\n').slice(1, -1);
      // Extract the header from the data
      const header = data.split('\n').slice(0, 1)[0].split(',');
      // Find the index of the 'firstname' and 'field' columns
      const idxFn = header.findIndex((ele) => ele === 'firstname');
      const idxFd = header.findIndex((ele) => ele === 'field');
      // Declare two dictionaries for counting each field and storing the list of students
      const fields = {};
      const students = {};
      // It will contain all data
      const all = {};

      lines.forEach((line) => {
        const list = line.split(',');
        if (!fields[list[idxFd]]) fields[list[idxFd]] = 0;
        fields[list[idxFd]] += 1;
        if (!students[list[idxFd]]) students[list[idxFd]] = '';
        students[list[idxFd]] += students[list[idxFd]]
          ? `, ${list[idxFn]}`
          : list[idxFn];
      });

      // Store the overall number of students
      all.numberStudents = `Number of students: ${lines.length}\n`;
      all.listStudents = [];
      // Build a list of information for each field
      for (const key in fields) {
        if (Object.hasOwnProperty.call(fields, key)) {
          const element = fields[key];
          all.listStudents.push(`Number of students in ${key}: ${element}. List: ${students[key]}`);
        }
      }
      return resolve(all);
    });
  });
}

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.write('This is the list of our students\n');
  countStudents(process.argv[2])
    .then((data) => {
      res.write(data.numberStudents);
      res.end(data.listStudents.join('\n'));
    })
    .catch((err) => {
      res.end(err.message);
    });
});

app.listen(port);

module.exports = app;
