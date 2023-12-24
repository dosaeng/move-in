const { program } = require('commander');
const { checkForCapacitorProject } = require('./lib/capacitor');
const { setIOSVersionAndBuild } = require('./lib/ios');
const { setAndroidVersionAndBuild } = require('./lib/android');
const { getPackageVersion } = require('./lib/package');

program.option('-v, --version <char>').option('-b, --build-number <char>');

program.parse();

const options = program.opts();
let version = options.version;
const buildNumber = options.buildNumber;
const workingDirectory = process.cwd() ?? program.args[0];

if (version === undefined) {
  try {
    version = getPackageVersion(process.cwd());
  } catch (e) {
    console.debug(e);
  }
}

try {
  if (version === undefined) {
    program.outputHelp();
    throw new Error('Require version.');
  }

  if (buildNumber === undefined) {
    program.outputHelp();
    throw new Error('Require build number.');
  }

  console.log(
    `Setting version to ${version} and build number to ${buildNumber}, directory: ${workingDirectory}`
  );

  checkForCapacitorProject(workingDirectory);
  setAndroidVersionAndBuild(workingDirectory, version, buildNumber);
  setIOSVersionAndBuild(workingDirectory, version, buildNumber);
} catch (e) {
  console.error(`\n[Error] ${e.message}`);
  process.exit(1);
}
