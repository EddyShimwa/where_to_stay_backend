const fs = require('fs');
const crypto = require('crypto');

// Generate a random secret key
const secretKey = crypto.randomBytes(64).toString('hex');

// Create or update the .env file with the new secret key
fs.writeFileSync('.env', `JWT_SECRET=${secretKey}\n`, { flag: 'a' });

console.log('JWT secret key generated and updated in .env file.');
