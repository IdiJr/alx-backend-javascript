const fs = require('fs');

module.exports = function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) return reject(Error('Cannot load the database'));
      
      // Split data into lines and exclude the header
      const lines = data.split('\n').slice(1);
      // Extract the header from the data
      const header = data.split('\n').slice(0, 1)[0].split(',');
      // Find the index of 'firstname' and 'field' in the header
      const idxFn = header.findIndex((ele) => ele === 'firstname');
      const idxFd = header.findIndex((ele) => ele === 'field');
      // Initialize dictionaries to count students in each field and store their names
      const fields = {};
      const students = {};

      // Process each line in the CSV file
      lines.forEach((line) => {
        const list = line.split(',');
        // Count students in each field
        if (!fields[list[idxFd]]) fields[list[idxFd]] = 0;
        fields[list[idxFd]] += 1;
        // Store the names of students in each field
        if (!students[list[idxFd]]) students[list[idxFd]] = '';
        students[list[idxFd]] += students[list[idxFd]] ? `, ${list[idxFn]}` : list[idxFn];
      });

      // Log the results to the console
      console.log(`Number of students: ${lines.length}`);
      for (const key in fields) {
        if (Object.hasOwnProperty.call(fields, key)) {
          const element = fields[key];
          console.log(`Number of students in ${key}: ${element}. List: ${students[key]}`);
        }
      }
      // Resolve the Promise as the operation is complete
      return resolve();
    });
  });
};
