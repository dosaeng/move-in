const fs = require('fs');
const path = require('path');

const PACKAGE_JSON_FILE = 'package.json';

/**
 * 
 * @param {string} dir 
 * @returns {string} version
 */
exports.getPackageVersion = (dir) => {
  const packageJsonPath = path.join(dir, PACKAGE_JSON_FILE);

  const packageJson = fs.readFileSync(packageJsonPath, 'utf-8');
  const packageInfo = JSON.parse(packageJson);

  return packageInfo.version;
};
