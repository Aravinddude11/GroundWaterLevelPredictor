import { exec } from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(exec);

async function setupDatabase() {
  try {
    // Start MongoDB (assumes MongoDB is installed)
    console.log('Starting MongoDB...');
    await execAsync('mongod --dbpath ./data/db');
  } catch (error) {
    console.error('Error starting MongoDB:', error);
    process.exit(1);
  }
}

setupDatabase();