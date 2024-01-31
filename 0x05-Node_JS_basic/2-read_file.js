const fs = require('fs');
const pathModule = require('path');

function countStudents(filePath) {
  try {const fs = require('fs');

  module.exports = function countStudents(path) {
    try {
      // read data
      const data = fs.readFileSync(path, { encoding: 'utf-8' });
      // split data and taking only list without header
      const lines = data.split('\n').slice(1, -1);
      // give the header of data
      const header = data.split('\n').slice(0, 1)[0].split(',');
      // find firstname and field index
      const idxFn = header.findIndex((ele) => ele === 'firstname');
      const idxFd = header.findIndex((ele) => ele === 'field');
      // declarate two dictionaries for count each fields and store list of students
      const fields = {};
      const students = {};
  
      lines.forEach((line) => {
        const list = line.split(',');
        if (!fields[list[idxFd]]) fields[list[idxFd]] = 0;
        fields[list[idxFd]] += 1;
        if (!students[list[idxFd]]) students[list[idxFd]] = '';
        students[list[idxFd]] += students[list[idxFd]] ? `, ${list[idxFn]}` : list[idxFn];
      });
  
      console.log(`Number of students: ${lines.length}`);
      for (const key in fields) {
        if (Object.hasOwnProperty.call(fields, key)) {
          const element = fields[key];
          console.log(`Number of students in ${key}: ${element}. List: ${students[key]}`);
        }
      }
    } catch (error) {
      throw new Error('Cannot load the database');
    }
  };
  
    // Read the database file synchronously
    const absolutePath = pathModule.resolve(__dirname, filePath);
    const data = fs.readFileSync(absolutePath, 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== '');

    // Get the total number of students
    const header = lines.shift();
    const totalStudents = lines.length;
    const fields = {};
    
    // declarate two dictionaries for count each fields and store list of students
    lines.forEach(line => {
      const [, , , field] = line.split(',');
      if (field) {
        fields[field] = fields[field] || [];
        fields[field].push(line.split(',')[0]);
      }
    });

    // Log the results
    console.log(`Number of students: ${totalStudents}`);
    Object.entries(fields).forEach(([field, students]) => {
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    });
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

// Export the function to make it accessible in other files
module.exports = countStudents;
