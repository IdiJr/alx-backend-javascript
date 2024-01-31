const fs = require('fs').promises; // Using fs.promises for asynchronous file reading

module.exports = async function countStudents(path) {
  try {
    // Read the entire file
    const data = await fs.readFile(path, { encoding: 'utf-8' });
    
    // Split data into lines
    const lines = data.split('\n').slice(1).filter(line => line.trim() !== ''); // Skip empty lines
    
    // Extract the header from the data
    const header = data.split('\n')[0].split(',');
    
    // Find firstname and field index
    const idxFn = header.findIndex((ele) => ele === 'firstname');
    const idxFd = header.findIndex((ele) => ele === 'field');
    
    // Declare two dictionaries for counting each field and storing the list of students
    const fields = {};
    const students = {};

    lines.forEach((line) => {
      const studentInfo = line.split(',').map(item => item.trim());
      const field = studentInfo[idxFd];

      if (!fields[field]) fields[field] = 0;
      fields[field] += 1;

      if (!students[field]) students[field] = '';
      students[field] += students[field] ? `, ${studentInfo[idxFn]}` : studentInfo[idxFn];
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
