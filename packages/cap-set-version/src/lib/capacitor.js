const fs = require('fs');
const path = require('path');

const CAPACITOR_CONFIG_TS_FILE = 'capacitor.config.ts';
const CAPACITOR_CONFIG_JS_FILE = 'capacitor.config.js';
const CAPACITOR_CONFIG_JSON_FILE = 'capacitor.config.json';

exports.checkForCapacitorProject = (dir) => {
  checkDirectoryExist(dir);

  checkCapacitorConfigExist(dir);
};

function checkDirectoryExist(dir) {
  if (!fs.existsSync(dir)) {
    throw new Error(`Invalid project path: directory ${dir} does not exist`);
  }
}

function checkCapacitorConfigExist(dir) {
  const configTsExist = fs.existsSync(path.join(dir, CAPACITOR_CONFIG_TS_FILE));
  const configJsExist = fs.existsSync(path.join(dir, CAPACITOR_CONFIG_JS_FILE));
  const configJsonExist = fs.existsSync(
    path.join(dir, CAPACITOR_CONFIG_JSON_FILE)
  );

  if (!configJsonExist && !configTsExist && !configJsExist) {
    throw new Error(
      `Invalid Capacitor project: neither ${CAPACITOR_CONFIG_TS_FILE}, nor ${CAPACITOR_CONFIG_JS_FILE} or ${CAPACITOR_CONFIG_JSON_FILE} exist in folder ${dir}`
    );
  }
}
