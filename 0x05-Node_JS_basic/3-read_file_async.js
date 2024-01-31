const fs = require('fs').promises;
const path = require('path');

/**
 * Count students in the database and log the information asynchronously.
 * @param {string} filePath - The path to the database file.
 * @returns {Promise<void>} A Promise that resolves when the operation is complete.
 */
async function countStudents(filePath) {
  try {
    const absolutePath = path.resolve(__dirname, filePath);
    const data = await fs.readFile(absolutePath, 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== '');

    // Skip the first line (header)
    const header = lines.shift();

    const totalStudents = lines.length;
    const fields = {};

    lines.forEach(line => {
      const [, , , field] = line.split(',');
      if (field) {
        fields[field] = fields[field] || [];
        fields[field].push(line.split(',')[0]);
      }
    });

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
