const fs = require('fs');
const path = require('path');

const IOS_PROJECT_FILE_PATH = 'ios/App/App.xcodeproj/project.pbxproj';

exports.setIOSVersionAndBuild = (dir, version, build) => {
  const projectFilePath = path.join(dir, IOS_PROJECT_FILE_PATH);

  let file = openIOSProjectFile(projectFilePath);

  file = setIOSVersion(file, version);
  file = setIOSBuild(file, build);

  fs.writeFileSync(projectFilePath, file, 'utf-8');
};

function openIOSProjectFile(projectFilePath) {
  try {
    return fs.readFileSync(projectFilePath, 'utf-8');
  } catch (error) {
    throw new Error(
      `Invalid iOS project file: file ${projectFilePath} does not exist`
    );
  }
}

function setIOSVersion(file, version) {
  if (!file.match(/(MARKETING_VERSION = ).*/g)) {
    throw new Error(
      `Could not find "MARKETING_VERSION" in project.pbxproj file`
    );
  }

  return file.replace(
    /(MARKETING_VERSION = ).*/g,
    `MARKETING_VERSION = ${version};`
  );
}

function setIOSBuild(file, build) {
  if (!file.match(/(CURRENT_PROJECT_VERSION = ).*/g)) {
    throw new Error(
      `Could not find "CURRENT_PROJECT_VERSION" in project.pbxproj file`
    );
  }

  return file.replace(
    /(CURRENT_PROJECT_VERSION = ).*/g,
    `CURRENT_PROJECT_VERSION = ${build};`
  );
}
