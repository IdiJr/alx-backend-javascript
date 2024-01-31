const fs = require('fs');
const pathModule = require('path');

function countStudents(filePath) {
  try {
    // Read the database file synchronously
    const absolutePath = pathModule.resolve(__dirname, filePath);
    const data = fs.readFileSync(absolutePath, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    // Get the total number of students
    lines.shift();
    const totalStudents = lines.length;
    const fields = {};

    // declarate two dictionaries for count each fields and store list of students
    lines.forEach((line) => {
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
