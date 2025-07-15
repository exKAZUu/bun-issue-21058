const fs = require('fs');
const path = require('path');

// Configuration
const TOTAL_DIRECTORIES = 10000;
const OUTPUT_DIR = 'artifacts';
const PLACEHOLDER_FILE = '.keep';

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`Created directory: ${OUTPUT_DIR}`);
}

// Random content generators
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Generate directories
console.log(`Generating ${TOTAL_DIRECTORIES} directories in ${OUTPUT_DIR}...`);
console.time('Generation completed in');

// Create a nested directory structure to simulate a complex project
// We'll create directories with a depth of up to 3 levels
for (let i = 1; i <= TOTAL_DIRECTORIES; i++) {
  // Create a unique directory path
  const dirName = `dir-${String(i).padStart(5, '0')}`;

  // Randomly decide if this should be a nested directory
  const depth = getRandomInt(1, 3);
  let dirPath = OUTPUT_DIR;

  if (depth >= 1) {
    // First level
    const level1 = `level1-${getRandomInt(1, 50)}`;
    dirPath = path.join(dirPath, level1);
  }

  if (depth >= 2) {
    // Second level
    const level2 = `level2-${getRandomInt(1, 30)}`;
    dirPath = path.join(dirPath, level2);
  }

  // Add the final directory name
  dirPath = path.join(dirPath, dirName);

  // Create the directory
  fs.mkdirSync(dirPath, { recursive: true });

  // Add an empty .keep file to prevent accidental removal
  const keepFilePath = path.join(dirPath, PLACEHOLDER_FILE);
  fs.writeFileSync(keepFilePath, '');

  if (i % 1000 === 0 || i === TOTAL_DIRECTORIES) {
    console.log(`Progress: ${i}/${TOTAL_DIRECTORIES} directories created`);
  }
}

console.timeEnd('Generation completed in');
console.log('Done!');
